import React, { Component } from 'react'

export class FormEdit extends Component  {
    state = {
        title: this.props.selectPost.title,
        text: this.props.selectPost.text,
    }
    titleOnChange = (e) =>{ //обработчик изменений в input title
        this.setState({
            title: e.target.value
        })
    }
    textOnChange = (e) =>{ //обработчик изменений в input title
        this.setState({
            text: e.target.value
        })
    }
    savePost = (e) =>{ //создание поста
        const post = {
            /*id: this.props.arr.length + 1,*/
            title: this.state.title,
            text: this.state.text,
            
        }
        this.props.editPost(post)//принимаем созданный пост, отправляем в main
        this.props.hideEditForm()
    }
    handleEnter = (e) =>{ //отправка формы при клике на enter
        if(e.key === "Enter" && this.props.showEditForm){
            this.createPost();
        }
    }
    componentDidMount(){ //событие при рендере компонента
        window.addEventListener("keyup", this.handleEnter)
    }
    componentWillUnmount(){ //очистка привязки события
        window.removeEventListener("keyup", this.handleEnter)
    }
    render(){
        
        return (
            <div className="formAdd">
                <form onSubmit={this.savePost}>
                  <input type="text" value={this.state.title} onChange={this.titleOnChange} />
                  <textarea value={this.state.text} onChange={this.textOnChange} />
                  <button type='submit'>Edit</button>
                  <button onClick={this.props.hideEditForm} className='hidenForm'>X</button>
                </form>
            </div>
        )
    }
}

export default FormEdit
