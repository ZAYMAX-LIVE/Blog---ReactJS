export const Item = (props) => {
  const bagColor = props.like ? "red" : "white";

  return (
    <div key={props.id} className="post" id={props.id}>
      <div>
        <h2>{props.title}</h2>
        <p>{props.text}</p>
        <div>
          <button
            style={{ backgroundColor: bagColor }}
            onClick={props.likePost}
          >
            Likes
          </button>
        </div>
      </div>
      <button onClick={props.deletPost}>X</button>
    </div>
  );
};

/*
 <button onClick={edit}>R</button>
 const edit = () =>{
    props.handleSelectPost();
    props.showEditForm();
  }
*/