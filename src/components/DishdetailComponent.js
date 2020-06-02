import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

import { Control, LocalForm, Errors } from 'react-redux-form';

function RenderDish({dish}){
 return (   
    <FadeTransform
    in
    transformProps={{
        exitTransform: 'scale(0.5) translateY(-50%)'
    }}>
<Card key={dish.id}>
    <CardImg width="100%" top src={baseUrl + dish.image} alt={dish.name} />
    <CardTitle>{dish.name}</CardTitle>
    <CardText>{dish.description}</CardText>   
</Card> 
</FadeTransform>
 )}



function RenderComments({comments,postComment, dishId}){  
const rencomment = comments.map((info) => 
             <Fade in>
             <ol key={info.id}>
             {console.log(info.id)}
             <p>{info.comment}</p>
             <p>-- {info.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(info.date)))}</p>
            </ol>  
            </Fade>   
              
    );
if(comments != null){
    console.log("about to return JSX") 
  
    return(
       
    <div>
   <Stagger in>
     {rencomment} 
     </Stagger>
    <CommentForm dishId={dishId} postComment={postComment}></CommentForm>
   
    </div>
    
    )
   
}
else{
    return <div></div>;
}
}


const DishDetail = (props)=>{
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
else if (props.dish != null)

return( 
    <div className="container">
    <div className="row">
        <Breadcrumb>
            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
        </div>                
    </div>
    <div className="row">
        <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments} 
            postComment={props.postComment}
            dishId={props.dish.id}/>
        </div>
    </div>
    </div>

);

else
return(
    <div></div>
);

}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component {

constructor(props){
    super(props);  
 
    this.state = {
        isModalOpen: false
      };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
        }


        toggleModal() {
            this.setState({
              isModalOpen: !this.state.isModalOpen
            });
          }

        handleSubmit(values) {
        this.toggleModal();
        console.log('Current State is: ' + JSON.stringify(values));
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        } 

render(){
    return(
<div>
<Button outline onClick={this.toggleModal} color="primary">Submit Comment</Button>

<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
<ModalBody>


<LocalForm onSubmit={(values) => this.handleSubmit(values)}>

<div className="container">

<Row className="form-group">
<Label htmlFor="rating" md={12}>Rating</Label>
<Col md={{size: 3, offset: 0}}>
<Control.select model=".rating" name="rating" className="form-control">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
</Control.select>
</Col>

</Row>




             <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            
                            <Row className="form-group">
                                <Col md={{size:10, offset: 0}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                            </div>
                           

                            </LocalForm>







</ModalBody>
</Modal>

  </div>



                

    )    
}
}



export default DishDetail;