import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Top from 'containers/TopV3'
import Login from 'containers/Login'
import PasswordResetRequest from 'containers/PasswordResetRequest'
import PasswordReset from 'containers/PasswordReset'
import ConfirmSignup from 'containers/ConfirmSignup'
import ConfirmEmail from 'containers/ConfirmEmail'
import UserRegistration from 'containers/UserRegistration'
import ProfileSetting from 'containers/ProfileSetting'
import ProfileDetail from 'containers/ProfileDetail'
import ProfileFollow from 'containers/ProfileFollow'
import ProfileFollower from 'containers/ProfileFollower'
import ProfileRegistration from 'containers/ProfileRegistration'
import SearchResults from 'containers/SearchResults'
import Contact from 'containers/Contact'
import Notification from 'containers/Notification'
import Recipe from 'containers/Recipe'
import RecipeTrouble from 'containers/RecipeTrouble'
import TroubleInput from 'containers/TroubleInputV3'
import TroubleInputConfirm from 'containers/TroubleInputConfirm'
import TroubleInputFinish from 'containers/TroubleInputFinish'
import Comment from 'containers/Comment'
import Category from 'containers/Category'
import CategoryList from 'containers/CategoryList'
import PostComment from 'containers/PostComment'
import DraftList from 'containers/DraftList'
import Search from 'containers/Search'
import Policy from 'containers/Policy'
import PrivacyPolicy from 'containers/PrivacyPolicy'
import SampleScreens from 'containers/SampleScreens'
import QuestionAnswer from 'containers/QuestionAnswer'
import ScrollToTop from 'components/ScrollToTop'

function BaseRouter() {
  return (
    <div className="app-router">
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Top} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/user-registration" component={UserRegistration} />
            <Route exact path="/password-reset-request" component={PasswordResetRequest} />
            <Route exact path="/password-reset" component={PasswordReset} />
            <Route exact path="/confirm-signup" component={ConfirmSignup} />
            <Route exact path="/confirm-email" component={ConfirmEmail} />
            <Route exact path="/profile/setting" component={ProfileSetting} />
            <Route exact path="/profile/follow/:userId" component={ProfileFollow} />
            <Route exact path="/profile/follower/:userId" component={ProfileFollower} />
            <Route exact path="/profile/registration" component={ProfileRegistration} />
            <Route exact path="/profile/:userId" component={ProfileDetail} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/search-results/:categoryId" component={SearchResults} />
            <Route exact path="/search-results/:categoryId/:keyword" component={SearchResults} />
            <Route exact path="/recipe/:recipeId/problems" component={RecipeTrouble} />
            <Route exact path="/recipe/:recipeId/:type" component={Recipe} />
            <Route exact path="/trouble-input" component={TroubleInput} />
            <Route exact path="/trouble-input/:recipeId/:type" component={TroubleInput} />
            <Route exact path="/trouble-input/confirm" component={TroubleInputConfirm} />
            <Route exact path="/trouble-input/finish" component={TroubleInputFinish} />
            <Route exact path="/comment/:recipeId/:type/:process/:index" component={Comment} />
            <Route exact path="/inquiry" component={Contact} />
            <Route exact path="/post-comment" component={PostComment} />
            <Route exact path="/draft-list" component={DraftList} />
            <Route exact path="/notification" component={Notification} />
            <Route exact path="/category" component={Category} />
            <Route exact path="/category/:categoryId" component={CategoryList} />
            <Route exact path="/category/:categoryId/:subCategoryId" component={CategoryList} />
            <Route exact path="/sample-screens" component={SampleScreens} />
            <Route exact path="/policy" component={Policy} />
            <Route exact path="/privacy-policy" component={PrivacyPolicy} />
            <Route exact path="/question-answer" component={QuestionAnswer} />
            <Redirect to="/" />
          </Switch>
        </div>
        <ScrollToTop />
        {/* <Footer /> */}
      </Router>
    </div>
  )
}

export default BaseRouter
