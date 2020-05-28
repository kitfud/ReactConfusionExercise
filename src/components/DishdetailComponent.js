import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dish: props
    }
}


renderComments(dish){  
const rencomment = dish.map((info) => 
      
             <li key={info.id}>
             {console.log(info.id)}
             <p>{info.comment}</p>
             <p>-- {info.author}, {info.date}</p>
           </li>  
              
    );


if(dish != null){
    console.log("about to return JSX")    
    return rencomment   
}
else{
    return <div></div>;
}


}


render(){
const dish = this.props.dish

if (dish != null)
return( 
<div className = "container">
<div className = "row">

<div  className="col-12 col-md-5 m-1">
<Card key={dish.id}>
    <CardImg width="100%" top src={dish.image} alt={dish.name} />
    <CardTitle>{dish.name}</CardTitle>
    <CardText>{dish.description}</CardText>   
</Card> 
</div> 

<div  className="col-12 col-md-5 m-1">
<h4>Comments:</h4>
<ul className="list-unstyled">
{this.renderComments(dish.comments)}
</ul>
</div> 

</div>
</div>

);

else
return(
    <div></div>
);

}

}

export default DishDetail;

