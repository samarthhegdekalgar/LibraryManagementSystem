// import React from 'react';

// import {
//     Avatar,
//     Form,
//     Input,
//     Select,
//     Button,
//     Upload,
//     Icon
//   } from 'antd';

// import { connect } from 'react-redux';
  
// const { Option } = Select;
// let reader = new FileReader()
// class Profile extends React.Component {

//   constructor(props) {
//       super(props);
//       this.state = {
//         confirmDirty: false,
//         uploadedPic: ''
//       };
//     }

  // componentDidMount(){
  //   if(this.props.isUpdated){
  //     this.props.form.setFields({
  //       name: {
  //         value: this.props.userName,
  //       },
  //       phone: {
  //         value: this.props.userMobileNumber
  //       },
  //       email: {
  //         value: this.props.userEmail
  //       }
  //     });
  //   }
  // }


//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.form.validateFieldsAndScroll((err, values) => {
//       if (!err) {
//         console.log('Received values of form: ', values);
//       }
//     });
//   };


//   render() {
//     const { getFieldDecorator } = this.props.form;
//     console.log('displayPic:', this.state.uploadedPic)

//     const formItemLayout = {
//       labelCol: {
//         xs: { span: 24 },
//         sm: { span: 8 },
//       },
//       wrapperCol: {
//         xs: { span: 24 },
//         sm: { span: 16 },
//       },
//     };
//     const tailFormItemLayout = {
//       wrapperCol: {
//         xs: {
//           span: 24,
//           offset: 0,
//         },
//         sm: {
//           span: 16,
//           offset: 8,
//         },
//       },
//     };
//     const prefixSelector = getFieldDecorator('prefix', {
//       initialValue: '91',
//     })(
//       <Select style={{ width: 70 }}>
//         <Option value="86">+91</Option>
//         <Option value="87">+87</Option>
//       </Select>,
//     );


//     return (
//         <div>
          // <Avatar src={this.state.uploadedPic} size={64} 
          // style={{marginLeft: 350, marginBottom: 20}}
          // />

          
//           <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          
//             <input type="file"
//                    id="image"
//                    accept="image/png, image/jpeg"  
//                    onChange={this.handleImageChange} 
//                    required/>

            // <Form.Item label="Name">
            //     {getFieldDecorator('name', {
            //     rules: [{ required: true, message: 'Please input your name!'}],
            //     })(<Input style={{ width: '100%' }}/>)}
            // </Form.Item>
            
//             <Form.Item label="Phone Number">
//                 {getFieldDecorator('phone', {
//                 rules: [{ required: true, message: 'Please input your phone number!' }],
//                 })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
//             </Form.Item>

//             <Form.Item label="E-mail">
//                 {getFieldDecorator('email', {
//                 rules: [
//                     {
//                     type: 'email',
//                     message: 'The input is not valid E-mail!',
//                     },
//                     {
//                     required: true,
//                     message: 'Please input your E-mail!',
//                     },
//                 ],
//                 })(<Input />)}
//             </Form.Item>

//             <Form.Item {...tailFormItemLayout}>
//                 <Button type="primary" htmlType="submit">
//                 Update Profile
//                 </Button>
//             </Form.Item>
//           </Form>
//         </div>
//     );
//   }
// }

// const WrappedProfileUpdateForm = Form.create({ name: 'register' })(Profile);

// const mapStateToProps = state => {
//   return {
//     userName: state.books.name,
//     userEmail: state.books.email,
//     userMobileNumber: state.books.mobileNumber,
//     userPic:state.books.displayPicURL,
//     isUpdated: state.books.isProfileUpdated
//   }
// }

//   export default connect(mapStateToProps, null)(WrappedProfileUpdateForm);


// import React from 'react';
// import { connect } from 'react-redux';
// import * as action from '../store/actions/action';


// class WrappedProfileUpdateForm extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state ={
//       file:null,
//       name: '',
//       number: '',
//       email: ''
//     }
//     this.onFormSubmit = this.onFormSubmit.bind(this)
//     this.onChange = this.onChange.bind(this)
//     this.fileUpload = this.fileUpload.bind(this)
//   }
//   onFormSubmit(e){
//     e.preventDefault() // Stop form submit
//     this.fileUpload(this.state.file, this.state.name, this.state.number, this.state.email).then((response)=>{
//       console.log(response.data);
//     })
//   }
//   onChange(e) {
//     this.setState({file:e.target.files[0]})
//   }
//   fileUpload(file, name, number, email){
//     const formData = new FormData();
//     formData.append('file',file)
    
//     console.log(formData);
//     const config = {
//         headers: {
//             'content-type': 'multipart/form-data'
//         }
//     }
//     this.props.profileUpdate(this.props.userID,formData, name, number, email, config);
//   }

//   render() {
//     return (
//       <form onSubmit={this.onFormSubmit}>
//         <h1>File Upload</h1>
        // <input type="file" onChange={this.onChange} />
//         <input type="text" onChange={() => this.setState({name: event.target.value})} />
//         <input type="number" onChange={() => this.setState({number: event.target.value})} />
//         <input type="email" onChange={() => this.setState({email: event.target.value})} />
//         <button type="submit">Upload</button>
//       </form>
//    )
//   }
// }

// const mapStateToProps = state => {
//   console.log('state User ID:', state.books.id);
//   return {
//     userID: state.books.id
//   }
// }

// const mapDispatchToProps = dispatch =>{
//   return {
//     profileUpdate: (id,formData, name, number, email, config) => dispatch( action.profileUpdate(id,formData, name, number, email, config))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(WrappedProfileUpdateForm);


// {-----------working code-------------------------------------------}


// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import * as action from '../store/actions/action';
// import { Input, Button } from 'antd';


// class WrappedProfileUpdateForm extends Component {

  // state = {
  //   name: '',
  //   email: '',
  //   number: '',
  //   image: null
  // };

  // handleChange = (e) => {
  //   this.setState({
  //     [e.target.id]: e.target.value
  //   })
  // };

  // handleImageChange = (e) => {
  //   this.setState({
  //     image: e.target.files[0]
  //   })
  // };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(this.state);
  //   let form_data = new FormData();
  //   form_data.append('display_pic', this.state.image, this.state.image.name);
  //   form_data.append('name', this.state.name);
  //   form_data.append('email', this.state.email);
  //   form_data.append('mobile_number', this.state.number);
  //   form_data.append('user', this.props.userID);

  //   // let url = 'http://localhost:8000/api/posts/';
  //   // axios.post(url, form_data, {
  //   //   headers: {
  //   //     'content-type': 'multipart/form-data'
  //   //   }
  //   // })
  //   //     .then(res => {
  //   //       console.log(res.data);
  //   //     })
  //   //     .catch(err => console.log(err))
  //   this.props.profileUpdate(form_data)
  // };

//   render() {
//     return (
//       <div className="App">
//         <form onSubmit={this.handleSubmit} style={{width: '50vw'}}>
//           <p>
//             <Input type="text" placeholder='Name' id='name' value={this.state.name} onChange={this.handleChange} required/>
//           </p>
//           <p>
//             <Input type="email" placeholder='email' id='email' value={this.state.email} onChange={this.handleChange} required/>
//           </p>
//           <p>
//             <Input type="number" placeholder='mobile number' id='number' value={this.state.number} onChange={this.handleChange} required/>
//           </p>
//           <p>
//             <input type="file"
//                    id="image"
//                    accept="image/png, image/jpeg"  onChange={this.handleImageChange} required/>
//           </p>
//           <Button type="primary" htmlType="submit">
//             Update Profile
//           </Button>
//         </form>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//   // console.log('state User ID:', state.books.id);
//   return {
    // userID: state.books.id
//   }
// }

// const mapDispatchToProps = dispatch =>{
//   return {
//     profileUpdate: (form_data) => dispatch( action.profileUpdate(form_data))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(WrappedProfileUpdateForm);


// {--------------------------------------}

import {
  Form,
  Input,
  Select,
  Button,
  Avatar,
  message,
} from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import * as action from '../store/actions/action';


const { Option } = Select;

class RegistrationForm extends React.Component {
  state = {
    // name: '',
    // email: '',
    // number: '',
    // image: null,
    uploadedPic: this.props.userPic
  };

  componentDidMount(){
    if(this.props.isUpdated){
      this.props.form.setFields({
        name: {
          value: this.props.userName,
        },
        phone: {
          value: this.props.userMobileNumber
        },
        email: {
          value: this.props.userEmail
        }

      });
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0]
    })
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('state value after update:', this.state)
        let form_data = new FormData();
        form_data.append('display_pic', this.state.image, this.state.image.name);
        form_data.append('name', this.state.register_name);
        form_data.append('email', this.state.register_email);
        form_data.append('mobile_number', this.state.register_phone);
        form_data.append('user', this.props.userID);

        this.props.profileUpdate(form_data);
        // this.props.authLogout();
      }
    });
  };

  // checkStatus(){
  //   if(this.props.isUpdated && this.props.isAuthenticated){
  //     message.success('Profile is up to date.',1)
  //   }
  // }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '91',
    })(
      <Select style={{ width: 70 }}>
        <Option value="91">+91</Option>
      </Select>
    );

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
    
        {/* {this.checkStatus()} */}

        <Avatar src={this.state.uploadedPic} size={64} 
                style={{marginLeft: 350, marginBottom: 20}}
        />

        <Form.Item label='Profile Picture'>
          {getFieldDecorator('image', {
            rules: [{ required: false, message: 'Please input profile picture'}],
          }) (<input 
                type='file' 
                accept='image/png, image/jpeg'  
                style={{ width: '30%'}}
                onChange={this.handleImageChange}
              />)}
        </Form.Item>

        <Form.Item label="Name">
          {getFieldDecorator('name', {
          rules: [{ required: true, message: 'Please input your name!'}],
          })(<Input 
              style={{ width: '100%' }}
              id='name' 
              value={this.state.name} 
              onChange={this.handleChange}
            />)}
        </Form.Item>

        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input 
                id='email' 
                value={this.state.email} 
                onChange={this.handleChange}
            />)}
        </Form.Item>

        <Form.Item label="Phone Number">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(<Input 
              addonBefore={prefixSelector} 
              style={{ width: '100%' }} 
              id='email' 
              value={this.state.email} 
              onChange={this.handleChange}
            />)}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedProfileUpdateForm = Form.create({ name: 'register' })(RegistrationForm);

const mapStateToProps = state => {
  return {
    userName: state.books.name,
    userEmail: state.books.email,
    userMobileNumber: state.books.mobileNumber,
    userPic:state.books.displayPicURL,
    isUpdated: state.books.isProfileUpdated,
    userID: state.books.id,
    isAuthenticated: state.books.token !== null

  }
}

const mapDispatchToProps = dispatch =>{
  return {
    profileUpdate: (form_data) => dispatch(action.profileUpdate(form_data)),
    // authLogout: () => dispatch(action.authLogout()),
  }
}


  export default connect(mapStateToProps, mapDispatchToProps)(WrappedProfileUpdateForm);
