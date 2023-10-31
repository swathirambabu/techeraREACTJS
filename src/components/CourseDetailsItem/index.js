import './index.css'

const CourseDetailsItem = props => {
  const {courseItemDetails} = props
  const {name, description, imageUrl} = courseItemDetails

  return (
    <li className="course-details-card">
      <div className="course-details-container">
        <img src={imageUrl} alt={name} className="image" />
        <div className="course-info-container">
          <h1 className="title">{name}</h1>
          <p className="info">{description}</p>
        </div>
      </div>
    </li>
  )
}
export default CourseDetailsItem
