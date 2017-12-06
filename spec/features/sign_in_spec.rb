require 'rails_helper'

feature 'sign in',%{
  As a account holder
  I want to sign in
  So that I can gain access to my account
} do

  scenario 'specify valid username and password' do
    visit new_user_session_path
    fill_in 'Email', with: 'JSmith@gmail.com'
    fill_in 'Password', with: 'password'
    click_button 'Sign In'

    # expect(page).to have_content("Sign Out")
  end

  scenario 'required information is not supplied' do
    visit new_user_session_path
    click_button 'Sign In'

    expect(page).to have_content('Invalid Email or password')
  end
end
