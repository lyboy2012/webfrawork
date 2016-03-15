import React from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
class CommentBox extends React.Component {
    constructor() {
        super();
        this.state = {data: []};
    }
    render() {
        return <div className="commentBox">
            <h1>Comments</h1>
            /*<CommentList data={this.props.data}/>*/
            <CommentList data={this.state.data} />
            <CommentForm />
        </div>;
    }
}
export default CommentBox;