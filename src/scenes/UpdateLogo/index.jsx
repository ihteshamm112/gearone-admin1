import { Box, Typography, Grid, Button, Stack, Divider, Avatar, Container, InputAdornment, OutlinedInput, FormControl, Select, MenuItem, InputLabel, Input, TextField, Breadcrumbs } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Subscriptions, Notifications, Settings, Person, Close, Upload, Add } from '@mui/icons-material';
import url from "../url"
import { useNavigate, useLocation } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
const override = {
    display: ' block',
    margin: '0 auto',
    borderColor: 'red',
}

const btn = {
    letterSpacing: "1px",
    width: '50%',
    marginTop: '40px',
    marginBottom: '40px',
    color: 'white',
    backgroundColor: '#FF6700',
    borderColor: '#FF6700',
    height: '50px',
    padding: '0px',
    font: 'normal normal normal 17px/26px Roboto',
    borderRadius: "50px",
    boxShadow: "none",
    fontWeight: "medium",
    boxShadow: "none",
    borderRadius: "50px",
    fontSize: "15px",
    textTransform: "capitalize"
}

const Team = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }
    const location = useLocation();

    const [hidelabel, setHidelabel] = useState(false);
    const [hidecrossicon, setHidecrossicon] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [Screens, setScreens] = useState([]);
    useEffect(() => {
        getAllScreens();
    }, [])
    const [isloading, setIsloading] = useState(false);

    const handleAdd = async () => {
        setIsloading(true)
        var InsertAPIURL = `${url}logos/update_logos`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        var Data = {
            "logo_id": location.state.id,
            "link": Link,
            "screen_id": Screen,
            "active_status": Status
        };
        await fetch(InsertAPIURL, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(Data),
        })
            .then(response => response.json())
            .then(async response => {
                console.log(response);
                if (response.message == `Logo Updated Successfully!`) {
                    if (selectedFile !== null && selectedFile !== undefined) {
                        var Data = {
                            "id": response.result[0].id,
                            "image": selectedFile,
                        };

                        await axios.put(url + "logos/add_logos_image", Data, {
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        }).then((response) => {
                            setIsloading(false)


                            // var InsertAPIURL = `${url}logos/add_logos_image`
                            // var headers = {
                            //     // 'Accept': 'application/json',
                            //     // 'Content-Type': 'application/json',
                            //     "Content-Type": "multipart/form-data"

                            // };
                            // var Data = {
                            //     "id": response.result[0].id,
                            //     "image": selectedFile,
                            // };
                            // await fetch(InsertAPIURL, {
                            //     method: 'PUT',
                            //     headers: headers,
                            //     body: JSON.stringify(Data),
                            // })
                            //     .then(response => response.json())
                            //     .then(response => {
                            console.log(response.data);
                            if (response.data.message == `Logo Image added Successfully!`) {
                                navigate("/ManageLogos")
                                setIsloading(false)
                            } else {
                                setIsloading(false)
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops2...',
                                    confirmButtonColor: "#FF6700",
                                    text: ''
                                })
                            }
                        }
                        )
                            .catch(error => {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    confirmButtonColor: "#FF6700",
                                    text: response.message
                                })
                            });
                    } else {
                        setIsloading(false)
                        navigate("/ManageLogos")
                    }
                } else {
                    setIsloading(false)
                    Swal.fire({

                        icon: 'error',
                        title: 'Oops...',
                        confirmButtonColor: "#FF6700",
                        text: ''
                    })
                }
            }
            )
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    confirmButtonColor: "#FF6700",
                    text: "Server Down!"
                })
            });
    }


    const getAllScreens = async () => {
        if (location.state.image !== undefined && location.state.image !== null && location.state.image !== '') {
            setHidelabel(true)
        }
        // setScreen(location.state.screen)

        var InsertAPIURL = `${url}screen/get_all_screen`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        await fetch(InsertAPIURL, {
            method: 'GET',
            headers: headers,
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if (response.message == `All screens Details`) {
                    // setLogos(response.count);
                    setScreens(response.result);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        confirmButtonColor: "#FF6700",
                        text: ''
                    })
                }
            }
            )
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    confirmButtonColor: "#FF6700",
                    text: "Server Down!"
                })
            });
    }

    const handleImageChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setHidecrossicon(true);
        setHidelabel(true);
    };

    const clearpreviewimage = () => {
        location.state.image = null
        setSelectedFile(null);
        setHidecrossicon(false);
        setHidelabel(false);
    }

    const [Status, setStatus] = React.useState('');
    const [Screen, setScreen] = React.useState('');
    const [Link, setLink] = React.useState('');

    const handleChangeScreen = (event) => {
        setScreen(event.target.value);
    };

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    return (
        <>
            <Box sx={{ height: "85vh", width: "100%", overflowX: "scroll" }}>
                <Grid container spacing={0} pt={{ lg: 2, xl: 1 }} p={2} >
                    <Grid item xs={6} align="" pt={3} >
                        <Breadcrumbs separator=">" >
                            <Typography variant="h5" fontWeight={550} pl={3} fontSize="15px" sx={{ letterSpacing: "2px", cursor: "pointer" }} color="#808080" onClick={() => navigate("/workoutplans")} >
                                Logo
                            </Typography>

                            <Typography variant="h5" fontWeight={600} fontSize="15px" sx={{ letterSpacing: "2px" }} color="#404040">
                                update Logo
                            </Typography>
                        </Breadcrumbs>
                    </Grid>

                </Grid>

                <Divider sx={{ pb: 2 }} />

                <Container>
                    <Container>
                        <Grid container spacing={0}>
                            <Grid xs={12} align="center" p={1}>
                                <Box pt={2} pb={2}>
                                    <Box sx={{ pt: 2, width: "300px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
                                        {hidelabel ?
                                            null
                                            :
                                            <Grid container spacing={0} pt={5}>
                                                <Grid xs={12} align="">
                                                    <Stack align="">
                                                        <label htmlFor="fileInput" style={{ display: "flex", justifyContent: "center", alignContent: "center", color: "#808080" }}>
                                                            <Stack direction="column" spacing={1} >
                                                                <Upload sx={{ fontSize: "50px", color: "#808080", ml: 1.8, pb: 1 }} />
                                                                <span style={{ paddingBottom: "2vh", font: "normal normal normal 16px/26px Arial" }}>Upload Image</span>
                                                            </Stack>
                                                        </label>
                                                        <input
                                                            style={{ display: "none" }}
                                                            id="fileInput"
                                                            type="file"
                                                            onChange={handleImageChange}
                                                            accept="image/*"
                                                        />
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        }

                                        {selectedFile ? <img src={URL.createObjectURL(selectedFile)} alt="Preview" style={{ width: "300px", height: "200px" }} />
                                            :
                                            location.state.image && <img src={`https://staging-gearone-be.mtechub.com/${location.state.image}`} alt="Preview" style={{ width: "300px", height: "200px" }} />
                                        }
                                    </Box>

                                    {
                                        hidecrossicon ?
                                            <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                <Close sx={{
                                                    padding: 0.2, backgroundColor: "#FF6700", borderRadius: "50px",
                                                    color: "white", ml: 32, mt: -24
                                                }} onClick={() => clearpreviewimage()} />
                                            </Box>
                                            :
                                            location.state.image ?
                                                <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                    <Close sx={{
                                                        padding: 0.2, backgroundColor: "#FF6700", borderRadius: "50px",
                                                        color: "white", ml: 32, mt: -24
                                                    }} onClick={() => clearpreviewimage()} />
                                                </Box>
                                                : null
                                    }
                                </Box>
                            </Grid>

                            <Grid xs={12} md={6} lg={6} xl={6} p={1} align="" >

                                <FormControl sx={{ width: "90%" }} align="left">
                                    <Stack direction="column" spacing={0} pt={2}>
                                        <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                                            link
                                        </Typography>
                                        <OutlinedInput
                                            onChange={(event) => {
                                                setLink(event.target.value);
                                            }}
                                            id="input-with-icon-adornment"
                                            placeholder={location.state.link}
                                            sx={{
                                                borderRadius: "50px",
                                                backgroundColor: "#F8F8F8",
                                                "& fieldset": { border: 'none' },
                                            }}
                                        />
                                        <br />
                                        <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                                            Screen
                                        </Typography>
                                        <Select
                                            sx={{
                                                borderRadius: "50px",
                                                backgroundColor: "#F8F8F8",
                                                "& fieldset": { border: 'none' },
                                            }}
                                            // displayEmpty
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            // className={classes.inner}
                                            // input={<BootstrapInput name="currency" id="currency-customized-select" />}                                         
                                            onChange={handleChangeScreen}
                                        >
                                            <MenuItem value={location.state.screen_id}>{location.state.screen}</MenuItem>
                                            {Screens.map((data) => (
                                                <MenuItem key={data.id} value={data.id}>{`${data.name}`}</MenuItem>
                                            ))}
                                        </Select>

                                        {/* <TextField
                                            id="outlined-multiline-static"
                                            multiline
                                            rows={4}
                                            sx={{
                                                borderRadius: "20px",
                                                backgroundColor: "#F8F8F8",
                                                "& fieldset": { border: 'none' },
                                            }}
                                        /> */}

                                    </Stack>

                                </FormControl>

                            </Grid>

                            <Grid xs={12} md={6} lg={6} xl={6} p={1} align="right" >

                                <FormControl sx={{ width: "90%" }} align="left">
                                    <Stack direction="column" spacing={0} pt={2}>
                                        <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                                            Status
                                        </Typography>
                                        <Select
                                            sx={{
                                                borderRadius: "50px",
                                                backgroundColor: "#F8F8F8",
                                                "& fieldset": { border: 'none' },
                                            }}
                                            id="input-with-icon-adornment"
                                            placeholder={location.state.status}
                                            onChange={(event) => { setStatus(event.target.value); }}
                                        >
                                            <MenuItem value={'active'}>Active</MenuItem>
                                            <MenuItem value={'inactive'}>InActive</MenuItem>
                                        </Select>
                                        <br />
                                        <br />

                                    </Stack>

                                </FormControl>

                            </Grid>
                            {isloading ?
                                <Grid xs={12} align="center">
                                    <Button variant="contained" style={btn}>
                                        <ClipLoader loading={isloading}
                                            css={override}
                                            size={10}
                                        />
                                    </Button>
                                </Grid>
                                :
                                <Grid xs={12} align="center">
                                    <Button variant="contained" style={btn} onClick={() => { handleAdd() }} >Update</Button>
                                </Grid>
                            }
                        </Grid>
                    </Container>
                </Container>

            </Box>
        </>
    )
}

export default Team




// import { Box, Typography, Grid, Button, Stack, Divider, Avatar, Container, InputAdornment, OutlinedInput, FormControl, Select, MenuItem, InputLabel, Input, TextField, Breadcrumbs } from "@mui/material";
// import { Subscriptions, Notifications, Settings, Person, Close, Upload, Add } from '@mui/icons-material';
// import React, { useState } from 'react'
// import { useNavigate } from "react-router-dom"
// import workout1 from '../../components/Images/workout1.png'
// import workout2 from '../../components/Images/workout2.png'
// import workout3 from '../../components/Images/workout3.png'
// import workout4 from '../../components/Images/workout4.png'
// import workout5 from '../../components/Images/workout5.png'
// import workout6 from '../../components/Images/workout6.png'
// import workout7 from '../../components/Images/workout7.png'
// import workout8 from '../../components/Images/workout8.png'

// const btn = {
//     letterSpacing: "1px",
//     width: '50%',
//     marginTop: '40px',
//     marginBottom: '40px',
//     color: 'white',
//     backgroundColor: '#FF6700',
//     borderColor: '#FF6700',
//     height: '50px',
//     padding: '0px',
//     font: 'normal normal normal 17px/26px Roboto',
//     borderRadius: "50px",
//     boxShadow: "none",
//     fontWeight: "medium",
//     boxShadow: "none",
//     borderRadius: "50px",
//     fontSize: "15px",
//     textTransform: "capitalize"
// }

// const btnchnge = {
//     letterSpacing: "1px",
//     width: 'content-fit',
//     marginTop: '10px',
//     // marginBottom: '40px',
//     color: 'white',
//     backgroundColor: '#FF6700',
//     borderColor: '#FF6700',
//     paddingLeft: "40px",
//     paddingRight: "40px",
//     font: 'normal normal normal 17px/26px Roboto',
//     borderRadius: "50px",
//     boxShadow: "none",
//     fontWeight: "medium",
//     boxShadow: "none",
//     borderRadius: "50px",
//     fontSize: "15px",
//     textTransform: "capitalize"
// }

// const Team = () => {
//     const navigate = useNavigate();
//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const open = Boolean(anchorEl);
//     const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };
//     const handleClose = () => {
//         setAnchorEl(null);
//     }

//     const [hidelabel, setHidelabel] = useState(false);
//     const [hidecrossicon, setHidecrossicon] = useState(false);
//     const [selectedFile, setSelectedFile] = useState(null);

//     const handleImageChange = (e) => {
//         setSelectedFile(e.target.files[0]);
//         setHidecrossicon(true);
//         setHidelabel(true);
//     };

//     const clearpreviewimage = () => {
//         setSelectedFile(null);
//         setHidecrossicon(false);
//         setHidelabel(false);
//     }

//     const [age, setAge] = React.useState('');

//     const handleChange = (event) => {
//         setAge(event.target.value);
//     };

//     return (
//         <>
//             <Box sx={{ height: "85vh", width: "100%", overflowX: "scroll" }}>
//                 <Grid container spacing={0} pt={{ lg: 2, xl: 1 }} p={2} >
//                     <Grid item xs={6} align="" pt={3} >
//                         <Breadcrumbs separator=">" >
//                             <Typography variant="h5" fontWeight={550} pl={3} fontSize="15px" sx={{ letterSpacing: "2px", cursor: "pointer" }} color="#808080" onClick={() => navigate("/workoutplans")} >
//                                 Exercise
//                             </Typography>

//                             <Typography variant="h5" fontWeight={600} fontSize="15px" sx={{ pt: 0, letterSpacing: "1px" }} color="#404040">
//                                 Update Exercise
//                             </Typography>
//                         </Breadcrumbs>
//                     </Grid>

//                 </Grid>

//                 <Divider sx={{ pb: 2 }} />

//                 <Container>
//                     <Container>
//                         <Grid container spacing={0}>
//                             <Grid xs={12} align="center" p={1}>
//                                 <Box pt={2} pb={2}>
//                                     <Box sx={{
//                                         pt: 2, width: "50%", height: "35vh", p: "0.5px",
//                                         backgroundImage: `url(${workout6})`,
//                                         borderTopRightRadius: "20px",
//                                         borderBottomLeftRadius: "20px",
//                                         borderBottomRightRadius: "20px",
//                                         backgroundSize: "cover",
//                                         backgroundRepeat: "no-repeat"
//                                     }}>
//                                         <Box height="35vh" sx={{ borderRadius: "10px", borderTopRightRadius: "20px", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px", background: "rgba(0, 0, 0, 0.2)" }}>
//                                             <Grid container spacing={0}>
//                                                 <Grid xs={11.5} align="right">
//                                                     <Button variant="contained" style={btnchnge}>Change</Button>
//                                                 </Grid>
//                                             </Grid>
//                                         </Box>
//                                     </Box>

//                                     <Typography variant="h5" fontWeight={600} fontSize="15px" sx={{ pt: 1, letterSpacing: "2px" }} color="#FF6700">
//                                         Workout Image
//                                     </Typography>

//                                 </Box>
//                             </Grid>

//                             <Grid xs={12} md={6} lg={6} xl={6} p={1} align="" >

//                                 <FormControl sx={{ width: "90%" }} align="left">
//                                     <Stack direction="column" spacing={0} pt={2}>
//                                         <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
//                                             Title
//                                         </Typography>
//                                         <OutlinedInput
//                                             id="input-with-icon-adornment"
//                                             defaultValue="Exercise Title Here"
//                                             sx={{
//                                                 borderRadius: "50px",
//                                                 backgroundColor: "#F8F8F8",
//                                                 "& fieldset": { border: 'none' },
//                                             }}
//                                         />
//                                         <br />
//                                         <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
//                                             Description
//                                         </Typography>
//                                         <TextField
//                                             id="outlined-multiline-static"
//                                             multiline
//                                             rows={4}
//                                             defaultValue="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,"
//                                             sx={{
//                                                 borderRadius: "20px",
//                                                 backgroundColor: "#F8F8F8",
//                                                 "& fieldset": { border: 'none' },
//                                             }}
//                                         />

//                                     </Stack>

//                                 </FormControl>

//                             </Grid>

//                             <Grid xs={12} md={6} lg={6} xl={6} p={1} align="right" >

//                                 <FormControl sx={{ width: "90%" }} align="left">
//                                     <Stack direction="column" spacing={0} pt={2}>
//                                         <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
//                                             Time/Reps
//                                         </Typography>
//                                         <OutlinedInput
//                                             id="input-with-icon-adornment"
//                                             defaultValue="Time/Reps here"
//                                             sx={{
//                                                 borderRadius: "50px",
//                                                 backgroundColor: "#F8F8F8",
//                                                 "& fieldset": { border: 'none' },
//                                             }}
//                                         />
//                                         <br />
//                                         <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
//                                             Video Link
//                                         </Typography>
//                                         <OutlinedInput
//                                             id="input-with-icon-adornment"
//                                             defaultValue="Video Link here"
//                                             sx={{
//                                                 borderRadius: "50px",
//                                                 backgroundColor: "#F8F8F8",
//                                                 "& fieldset": { border: 'none' },
//                                             }}
//                                         />
//                                     </Stack>

//                                 </FormControl>

//                             </Grid>

//                             <Grid xs={12} align="center">
//                                 <Button variant="contained" style={btn} onClick={() => navigate("/exercises")} >Update</Button>
//                             </Grid>

//                         </Grid>
//                     </Container>
//                 </Container>

//             </Box>
//         </>
//     )
// }

// export default Team