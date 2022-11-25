const ReviewStatus = ({ word }) => {

   
    
  return (
    <div>
      <span
        title="Total Reviews"
        className="badge rounded-pill text-bg-primary"
      >
        {word.total_reviews_count}
      </span>
      <span
        title="Successful Reviews"
        className="badge rounded-pill text-bg-success"
      >
        {word.success_reviews_count}
      </span>
      <span
        title="Failed Reviews"
        className="badge rounded-pill text-bg-danger"
      >
        {word.fail_reviews_count}
      </span>
    </div>
  );
};

export default ReviewStatus;
