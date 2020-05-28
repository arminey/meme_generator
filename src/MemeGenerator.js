import React, {Component} from "react"

class MemeGenerator extends Component {
   constructor() {
      super();
      this.state = {
         topText: "",
         bottomText: "",
         randomImg: "http://i.imgflip.com/1bij.jpg",
         allMemeImg: []
      };

      this.onChangeHandler = this.onChangeHandler.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   componentDidMount() {
      fetch("https://api.imgflip.com/get_memes")
         .then(res => res.json())
         .then(res => {
            const {memes} = res.data;
            this.setState({allMemeImg: memes});
         })
   }

   onChangeHandler(event) {
      const {name, value} = event.target;
      this.setState({ [name]: value });
   }

   handleSubmit(event) {
      event.preventDefault();
      let randomId = Math.floor(Math.random() * this.state.allMemeImg.length);
      const randomMeme = this.state.allMemeImg[randomId].url;
      this.setState({randomImg: randomMeme});
   }

   render() {
      return (
         <div>
            <form className="meme-form" onSubmit={this.handleSubmit}>
               
               <input 
                  type="text"
                  name="topText" 
                  placeholder="Top Text"
                  value={this.state.topText}
                  onChange={this.onChangeHandler}
               />
               
               <input 
                  type="text"
                  name="bottomText" 
                  placeholder="Bottom Text"
                  value={this.state.bottomText}
                  onChange={this.onChangeHandler}
                />
               
               <button>Gen</button>
            </form>
            <div className="meme">
               <img src={this.state.randomImg} alt="" />
               <h2 className="top">{this.state.topText}</h2>
               <h2 className="bottom">{this.state.bottomText}</h2>
            </div>
         </div>
      );
   }
}

export default MemeGenerator
