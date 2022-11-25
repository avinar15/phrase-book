import './loading.css';

function Loading({loading}) {
  return (
    <div className={loading ? 'loading' : 'notloadiong'}>
     Please Wait...
    </div>
  );
}

export default Loading;
