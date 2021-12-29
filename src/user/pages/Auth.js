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
import ErrorModal from "../../shared/components/UIElements/ErrorModal"

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState(null)

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
          name: undefined
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
    setisLoading(true)

    if(isLoginMode){
      const payload={
        email:formState.inputs.email.value,
        pwd:formState.inputs.password.value

      }
      try{
        const response= await fetch("http://localhost:5000/api/users/login",{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(payload)
        });
        const jsonData=await response.json();
        if(!response.ok){
          throw new Error(response.message)
        }
        debugger
        console.log('jsondata',jsonData);
        setisLoading(false)
    auth.login();

      }
      catch(e){
        setisLoading(false)
        seterror(e.message||'Something went wrong, Please try again later')


      }
    }
    else{
      const payload={
        email:formState.inputs.email.value,
        pwd:formState.inputs.password.value,
        uname:formState.inputs.name.value
  
      }
      try{
        const response= await fetch("http://localhost:5000/api/users/signup",{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(payload)
        });
        const jsonData=await response.json();
        if(!response.ok){
          throw new Error(response.message)
        }
        debugger
        console.log('jsondata',jsonData);
        setisLoading(false)
    auth.login();

      }
      catch(e){
        setisLoading(false)
        seterror(e.message||'Something went wrong, Please try again later')


      }
      
    }
    
  };

  return (
    <>
      {error&&<ErrorModal error={error} onClear={()=>seterror(null)}/>}

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
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password, at least 5 characters."
          onInput={inputHandler}
        />
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
