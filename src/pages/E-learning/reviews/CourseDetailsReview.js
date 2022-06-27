import PropTypes from 'prop-types';
import { useEffect,  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { Divider, Collapse } from '@mui/material';

import { getReviewsByIdCourse } from '../../../redux/actions/E-LearningActions/reviews';



//
import CourseDetailsReviewForm from './CourseDetailsReviewForm';
import CourseDetailsReviewList from './CourseDetailsReviewList';
import CourseDetailsReviewOverview from './CourseDetailsReviewOverview';


// ----------------------------------------------------------------------

CourseDetailsReview.propTypes = {
  product: PropTypes.object,
  course: PropTypes.object,
};

export default function CourseDetailsReview({ course }) {
  const [reviewBox, setReviewBox] = useState(false);
  const dispatch = useDispatch();

  const handleOpenReviewBox = () => {
    setReviewBox((prev) => !prev);
  };

  const handleCloseReviewBox = () => {
    setReviewBox(false);
  };

  useEffect(() => {
    dispatch(getReviewsByIdCourse(course._id));
  }, [dispatch]);
  const reviews = useSelector((state) => state.reviews);
  console.log(reviews)

  return (
    <>
      <CourseDetailsReviewOverview reviewsList={reviews}  onOpen={handleOpenReviewBox} />

      <Divider />

      <Collapse in={reviewBox}>
        <CourseDetailsReviewForm course={course} onClose={handleCloseReviewBox} id="move_add_review" />
        <Divider />
      </Collapse>

      <CourseDetailsReviewList reviewsList={reviews} />
    </>
  );
}
