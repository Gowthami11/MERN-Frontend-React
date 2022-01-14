import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import useHttpClient from '../../shared/hooks/http-hook';
const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

const {isLoading,error,clearError,sendRequest}=useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image:undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          },
          image:{
            value:'',
            isValid:false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();
    console.log(formState.inputs);

    if(isLoginMode){
      const payload={
        email:formState.inputs.email.value,
        pwd:formState.inputs.password.value

      }
      try{
        const response= await sendRequest("http://localhost:5000/api/users/login",'POST',JSON.stringify(payload),{'Content-Type':'application/json'});
       
        
        console.log('jsondata',response);
        debugger
    auth.login(response.userId,response.token);

      }
      catch(e){
       


      }
    }
    else{
      //no need to stringify and ssend headers, when formdata is used
      const formData=new FormData();
      formData.append("email",formState.inputs.email.value);
      formData.append("pwd",formState.inputs.password.value);
      formData.append("uname",formState.inputs.name.value);
      formData.append("image",formState.inputs.image.value)
      // const payload={
      //   email:formState.inputs.email.value,
      //   pwd:formState.inputs.password.value,
      //   uname:formState.inputs.name.value
  
      // }
      try{
        const response= await sendRequest("http://localhost:5000/api/users/signup",
        'POST',

         formData
        );
    auth.login(response.userId,response.token);

       

      }
      catch(e){
        


      }
      
    }
    
  };

  return (
    <>
      {error&&<ErrorModal error={error} onClear={()=>clearError()}/>}

    <Card className="authentication">
      {isLoading&&<LoadingSpinner asOverlay/>}
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
          />
        )}
        <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid password, at least 6 characters."
          onInput={inputHandler}
        />
        {!isLoginMode&&<ImageUpload id="image"  center onInput={inputHandler}/>}
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </Button>
    </Card>
    </>
  );
};

export default Auth;
