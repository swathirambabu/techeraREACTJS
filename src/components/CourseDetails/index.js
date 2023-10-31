import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CourseDetailsItem from '../CourseDetailsItem'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseDetails extends Component {
  state = {courseDetailsList: [], apiStatus: apiStatusConstants}

  componentDidMount() {
    this.getCourseDetails()
  }

  onClickRetry = () => {
    this.getCourseDetails()
  }

  renderFailureView = () => (
    <div className="error-container">
      <img
        className="error-img"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png "
        alt="failure view"
      />
      <h1 className="error-heading">Oops! SOmething Went Wrong</h1>
      <p className="error-info">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  getCourseDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = [fetchedData.course_details].map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
        description: each.description,
      }))
      this.setState({
        courseDetailsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderCourseDetailsView = () => {
    const {courseDetailsList} = this.state
    return (
      <ul className="course-details-container">
        {courseDetailsList.map(each => (
          <CourseDetailsItem key={each.id} courseItemDetails={each} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#00bfff" height={50} width={50} />
    </div>
  )

  renderCourseDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCourseDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderCourseDetails()}
      </>
    )
  }
}
export default CourseDetails
