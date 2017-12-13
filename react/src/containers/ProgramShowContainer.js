import React, { Component } from 'react';
import ReviewFormContainer from './ReviewFormContainer.js'
import ReviewTile from '../components/ReviewTile'

class ProgramShowContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      reviews: [],
      program: {},
      usernames: []
    }
  }

  upVote(reviewId) {
    newVote = {
      user: current_user,
      value: 2,
      review_id: reviewId
    }
    
  }

  componentDidMount(){
    let programId = this.props.params.id
    fetch(`/api/v1/programs/${programId}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        program: body['program'],
        reviews: body['reviews'],
        usernames: body['usernames']
       })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }


  render(){
    let program = this.state.program
    let reviews = this.state.reviews.map((review, i) => {
      let date = new Date(review.created_at);
      let shortdate = (date.getMonth()+1)+'-' + date.getDate() + '-'+date.getFullYear();
      let upVote = () => { this.upVote(review.id) }
      let downVote = () => { this.downVote(review.id) }
      return(
        <ReviewTile
          key={review.id}
          id={review.id}
          data={review}
          username={this.state.usernames[i]}
          shortdate={shortdate}
          upVote={upVote}
          downVote={downVote}
        />
      )
    })


    return(
      <div>
        <h1>Program Show Container</h1>
        <div className="row">
          <div className="large-6 small-6 small-6 columns">
            <p>{program.title}</p>
            <img className="show-page-poster" src={program.poster_url} />
          </div>
          <div className="large-6 small-6 small-6 columns">
            <p>
              <br /> <br /> <br />
              Year: {program.year}<br />
              Rated: {program.rated}<br />
              Run Time: {program.run_time}<br />
              Genre: {program.genre}<br />
              Actor: {program.actor}<br />
              Plot: {program.plot}<br />
              Awards: {program.award}<br />
              IMDB Rating: {program.imdb_rating}<br />
              Total Seasons: {program.total_seasons}
            </p>
          </div>
        </div>
        <div>
          <ReviewFormContainer
            program_id={this.props.params.id}
            reviews={this.state.reviews}
          />
        </div>
        {reviews}
      </div>
    )
  }
}

export default ProgramShowContainer;
