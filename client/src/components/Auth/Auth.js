import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core"
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Icon from "./icon"
import useStyles from "./styles"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from './Input';
import Binoculars from '../../assets/images/binocularsblack copy.png'
import cityVideo from '../../components/welcomeVideo/welcome.mp4'

const Auth = (props) => {
    const classes = useStyles();
   
    const [isSignup] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    // const isSignup = true;

    

    const handleSubmit = () => {

    };

    const handleChange = () => {

    };

   
    // gain access to a full response // 
    const googleSuccess = async (res) => {
        // console.log(res)
        const result = res?.profileObj; // will not get an error if res does not exists. //
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } });

            history.push("/account")
        } catch (error) {
            console.log(error);
        }
    };



    const googleFailure = (error) => {
        console.log(error)
        console.log("Google Sign in was unsuccessful.")
    };


    return (
        
        <div className="video">
        <video autoPlay muted loop
            style={{

                position: 'absolute',
                width: '100%',
                left: '50%',
                top: '50%',
                height: '100%',
                objectFit: 'cover',
                transform: 'translate(-50%, -50%',
                zIndex: '-1'
            }}>

            <source src={cityVideo} type='video/mp4' />
        </video>
        <br /><br />
            <Container component="main" maxwidth="xs">

                <Paper className={classes.paper} elevation={3} style= {{marginTop : 'px'}} >
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5" style={{ color: 'black', padding: '10px' }}>{isSignup ? "Sign up for Rediscover" : "Login to Rediscover"}</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2} style={{ marginBottom: '8px' }}>
                            {
                                isSignup && (
                                    <>
                                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                        <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                    </>
                                )}
                        </Grid>


                        <br></br>


                        <GoogleLogin
                            clientId="331387044870-4vcca4gks0t7qnhb4r2gcrv3uotikji5.apps.googleusercontent.com"
                            render={(renderProps) => (
                                <Button
                                    className={classes.googleButton}
                                    color="primary"
                                    fullWidth
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    startIcon={<Icon />}
                                    variant="contained">
                                    Login to Rediscover with Google
                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"

                        />
                        <Grid container justify="flex-end">
                            <Grid item>
                            </Grid>
                        </Grid>


                        <br /><br /><br />
                        <div>
                            <img src={Binoculars} alt="binoculars" height="100px" />
                        </div>
                    </form><br />
                </Paper> 
            </Container>
            
        </div >

    )
}

export default Auth; 