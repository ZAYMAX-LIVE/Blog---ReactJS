import React, { Component } from 'react'

export class FormAdd extends Component  {
    state = {
        Title: '',
        Text: ''
    }
    titleOnChange = (e) =>{ //обработчик изменений в input title
        this.setState({
            Title: e.target.value
        })
    }
    textOnChange = (e) =>{ //обработчик изменений в input title
        this.setState({
            Text: e.target.value
        })
    }
    createPost = () =>{ //создание поста
        const post = {
            /*id: this.props.arr.length + 1,*/
            title: this.state.Title,
            text: this.state.Text,
            like: false
        }
        this.props.newPost(post)//принимаем созданный пост, отправляем в main
        this.props.hideAddForm()
    }
    handleEnter = (e) =>{ //отправка формы при клике на enter
        if(e.key === "Enter" && this.props.showAddForm){
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
                <form onSubmit={this.createPost}>
                  <input type="text" value={this.state.Title} onChange={this.titleOnChange} required/>
                  <textarea value={this.state.Text} onChange={this.textOnChange} rows={8} required/>
                  <button type='submit'>Add</button>
                  <button onClick={this.props.hideAddForm} className='hidenForm'>X</button>
                </form>
            </div>
        )
    }
}

export default FormAdd
