import React, { Component } from "react";
import { posts } from "../data/posts";
import FormAdd from "./FormAdd";
import axios from "axios";
import { Item } from "./Item";
import FormEdit from "./FormEdit";

let source; //токен для отмены http запроса

export class Main extends Component {
  state = {
    /*showBlog: true,*/
    AddFrom: false,
    EditForm: false,
    arr: [],
    server: false,
    selectPost: {},
  };
  likePost = (postId) => {
    const temp = {...postId}
    temp.like = !temp.like
    this.setState({
      server: true
    })
    axios.put(`https://61d2dc63b4c10c001712b62c.mockapi.io/api/posts-zaymax/posts/${postId.id}`,temp)
    .then((response)=>{
      source = axios.CancelToken.source();
      axios
          .get(
            "https://61d2dc63b4c10c001712b62c.mockapi.io/api/posts-zaymax/posts", {cancelToken: source.token}
          )
          .then((response) => {
            this.setState({
              arr: response.data,
              server: false
            });
          });
    })
    
    /*
    const temp = [...this.state.arr];
    temp[pos].like = !temp[pos].like;
    this.setState({
      arr: temp,
    });
    localStorage.setItem("blogLike", JSON.stringify(temp));*/
  };

  /*togButton = () => {
    this.setState({
      showBlog: !this.state.showBlog, //переключатель состояния кнопки
    });
  };
  <button onClick={this.togButton}>
            {this.state.showBlog ? "X" : "+"}
  </button>
  { this.state.showBlog ? ( //если true, выводит блок}
  */
  deletPost = (postId) => {
    //удаление поста по его позиции
    this.setState({
      server: true
    })
    axios
      .delete(
        `https://61d2dc63b4c10c001712b62c.mockapi.io/api/posts-zaymax/posts/${postId.id}`
      )
      .then((response) => {
        source = axios.CancelToken.source();
        axios
          .get(
            "https://61d2dc63b4c10c001712b62c.mockapi.io/api/posts-zaymax/posts",  {cancelToken: source.token}
          )
          .then((response) => {
            this.setState({
              arr: response.data,
              server: false
            });
          });
      });
  };
  /* 
  deletPost = (pos) => {
    //удаление поста по его позиции
    const temp = [...this.state.arr];
    temp.splice(pos, 1);
    this.setState({
      arr: temp,
    });
    localStorage.setItem('blogLike', JSON.stringify(temp)) //лок. хранение изменений
  };
  */
  showAddForm = () => {
    //смена состояния кнопки добавления поста
    this.setState({
      AddFrom: true,
    });
  };
  hideAddForm = () => {
    this.setState({
      AddFrom: false,
    });
  };
  showEditForm = () => {
    //смена состояния кнопки добавления поста
    this.setState({
      EditForm: true,
    });
  };
  hideEditForm = () => {
    this.setState({
      EditForm: false,
    });
  };
  /*editPost = (e) =>{
    this.setState({
      server: true
    })
    axios.put(`https://61d2dc63b4c10c001712b62c.mockapi.io/api/posts-zaymax/posts/${e.id}`,e)
    .then((response)=>{
      console.log(response.data);
      axios
          .get(
            "https://61d2dc63b4c10c001712b62c.mockapi.io/api/posts-zaymax/posts"
          )
          .then((response) => {
            console.log(response);
            this.setState({
              arr: response.data,
              server: false,
            });
          });
    })
  }*/
  newPost = (e) => {
    this.setState({
      server: true
    })
    axios.post('https://61d2dc63b4c10c001712b62c.mockapi.io/api/posts-zaymax/posts',e)
    .then((response)=>{
      source = axios.CancelToken.source();
      axios
          .get(
            "https://61d2dc63b4c10c001712b62c.mockapi.io/api/posts-zaymax/posts", {cancelToken: source.token}
          )
          .then((response) => {
            this.setState({
              arr: response.data,
              server: false
            });
          });
    })
    
    /*
    //пушим новый пост в массив state.arr
    const temp = [...this.state.arr];
    temp.push(e);
    this.setState({
      arr: temp,
    });
    localStorage.setItem("blogLike", JSON.stringify(temp));
    */
  };
  componentDidMount() {
    this.setState({
      server: true
    })
    source = axios.CancelToken.source();
    axios
      .get("https://61d2dc63b4c10c001712b62c.mockapi.io/api/posts-zaymax/posts",  {cancelToken: source.token})
      .then((response) => {
        this.setState({
          arr: response.data,
          server: false
        });
      });
  }
  componentWillUnmount(){
    if(source){
      source.cancel('Axios canceled')
    }
  }
  handleSelectPost = (e) =>{
    this.setState({
      selectPost: e
    })
  }
  
  render() {
    const blogPosts = this.state.arr.map((item, pos) => {
      return (
        <Item
          id={item.id}
          title={item.title}
          text={item.text}
          like={item.like}
          likePost={() => this.likePost(item)}
          deletPost={() => this.deletPost(item)}
          showEditForm={this.showEditForm}
          handleSelectPost={() => this.handleSelectPost(item)}
        />
      );
    });
    return (
      <>
        {this.state.AddFrom && (
          <FormAdd
            showAddForm={this.showAddForm}
            newPost={this.newPost}
            arr={this.state.arr}
            hideAddForm={this.hideAddForm}
          />
        )}
        <section>
          <>
            <h1>
              Blog{" "}
              <button onClick={this.showAddForm} className="AddPost">
                +
              </button>
            </h1>
            {this.state.server && <h2>Download...</h2>}
            <div className="posts">{blogPosts}</div>
          </>
        </section>
      </>
    );
  }
}

export default Main;

/*
{this.state.EditForm && (
          <FormEdit
            hideEditForm={this.hideEditForm}
            selectPost={this.state.selectPost}
            editPost={this.editPost}
          />
        )}
*/