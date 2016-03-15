import React from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
class CommentBox extends React.Component {
    constructor() {
        super();
        this.state = {data: []};
    }
    componentDidMount(){
        var data =  [
            {id: 1, author: "Pete Hunt", text: "This is one comment--"},
            {id: 2, author: "Jordan Walke", text: "This is *another* comment--"}
        ];
        this.setState({data: data});
    }
    render() {
        return <div className="commentBox">
            <h1>Comments</h1>
            <CommentList data={this.state.data} />
            <CommentForm />
        </div>;
    }
}

export default CommentBox;