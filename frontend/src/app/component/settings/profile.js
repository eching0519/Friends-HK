import React, { useEffect, useState } from "react";
import $ from 'jquery';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import Tags from "../../../../node_modules/bootstrap5-tags/tags";
import IonRangeSlider from 'react-ion-slider'
import HobbyList from "./util/hobbyList";

const querystring = require('querystring');

// Language
// Basic: Gender(多元), Date of birth (星座), City & Country (Can set Undefined)
// Introduction questions: 3 (Facts about me)
// Hobby
// Topic you are Interest
// Friends preference: Gender, Age range, Language

const ProfileSettings = (props) => {
    const [user, setUser] = useState(props.user)
    const [isLoaded, setLoaded] = useState(false)   // Check if page is loaded

    const [ulang, setULang] = useState(user.lang==null? '' : user.lang);
    const [uco, setUCO] = useState(user.co==null? '' : user.co);
    const [ugender, setUGender] = useState(user.gender==null? 'ND' : user.gender);
    const [dob, setDOB] = useState(user.dob==null? '' : new Date(user.dob));
    const [uhobbies , setUHobbies] = useState(user.hobbies==null? [] : user.hobbies);
    const [bio , setBio] = useState(user.bio==null? '' : user.bio);
    const [hashtags , setHashtags] = useState(user.hashtags==null? [] : user.hashtags);

    const [plang , setPLang ] = useState(user.preferences==null? ["yue", "cmn", "eng"] : user.preferences.lang);
    const [pgender , setPGender ] = useState(user.preferences==null? ["M", "F", "TM", "TF", "NB", "ND"] : user.preferences.gender);
    const [ageFrom, setAgeFrom] = useState(user.preferences==null? 18 : user.preferences.ageFrom);
    const [ageTo, setAgeTo] = useState(user.preferences==null? 40 : user.preferences.ageTo);

    console.log(hashtags)

    const ageArr = Array.from({length: 53}, (_, i) => i + 12)
    ageArr.push('65+')

    Tags.init("select[multiple]");
    // Other form setting by jquery
    $('.react-datepicker-wrapper').addClass('w-100')
    $('.form-control.dropdown').children('div').addClass('cursor-text')
    
    // Run when form is changed
    const [count, setCount] = useState(0)
    useEffect(()=> {
        setCount(count+1)
        if (!isLoaded) {
            if(count == 1)
                setLoaded(true);
            return
        }
        
        console.log("Form has changed: ")
        props.setFormChanged(true)
        $("#submitBtn").removeClass('disabled')
    }, [ulang, uco, ugender, dob, uhobbies, bio, hashtags, plang, pgender, ageFrom, ageTo]);

    const sendUpdatePreferenceRequest = async (d) => {
        let url = '/user/profile/preferences/update';

        console.log(querystring.stringify({
            lang: ulang,
            co: uco,
            gender: ugender,
            dob: dob.toLocaleDateString('en-GB', {
                day: 'numeric', month: 'short', year: 'numeric'
              }).replace(/ /g, '-'),
            hobbies: uhobbies,
            bio: bio,
            hashtags: hashtags,
            plang: plang,
            pgender: pgender,
            ageFrom: ageFrom,
            ageTo: ageTo
        }))

        let res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: querystring.stringify({
                lang: ulang,
                co: uco,
                gender: ugender,
                dob: dob.toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'short', year: 'numeric'
                  }).replace(/ /g, '-'),
                hobbies: uhobbies,
                bio: bio,
                hashtags: hashtags,
                plang: plang,
                pgender: pgender,
                ageFrom: ageFrom,
                ageTo: ageTo
            })
        });

        console.log(querystring.stringify({
            lang: ulang,
            co: uco,
            gender: ugender,
            dob: dob.toLocaleDateString('en-GB', {
                day: 'numeric', month: 'short', year: 'numeric'
              }).replace(/ /g, '-'),
            hobbies: uhobbies,
            bio: bio,
            hashtags: hashtags,
            plang: plang,
            pgender: pgender,
            ageFrom: ageFrom,
            ageTo: ageTo
        }));

        let data
        try {
            data = await res.json();
        } catch (error) {
            props.setAlert({
                visible: true,
                strongMsg: 'Error!',
                msg: `Unexpected error. (${error.message})`
            })
            return;
        }

        if (!data.success) {
            props.setAlert({
                visible: true,
                strongMsg: 'Sorry!',
                msg: `${data.message}`
            })
            return;
        }

        console.log(data.user)

        setUser(data.user)
        props.setUser(data.user)
        window.alert("Your information is updated")
        resetForm()
    };

    const resetForm = () => {
        setULang(user.lang==null? '' : user.lang);
        setUCO(user.co==null? '' : user.co);
        setUGender(user.gender==null? 'ND' : user.gender);
        setDOB(user.dob==null? '' : new Date(user.dob));
        setUHobbies(user.hobbies==null? [] : user.hobbies);
        setBio(user.bio==null? '' : user.bio);
        setHashtags(user.hashtags==null? [] : user.hashtags);
        setPLang(user.preferences==null? ["yue", "cmn", "eng"] : user.preferences.lang);
        setPGender(user.preferences==null? ["M", "F", "TM", "TF", "NB", "ND"] : user.preferences.gender);
        setAgeFrom(user.preferences==null? 18 : user.preferences.ageFrom);
        setAgeTo(user.preferences==null? 40 : user.preferences.ageTo);
        $('#submitBtn').addClass('disabled').promise().then("class added")
        props.setFormChanged(false)
    }

    return (
        <>
        
        <form className="forms-sample" onSubmit={async (e)=>{
                e.preventDefault();
                let d = e.target.elements['udob'].value.toString()
                sendUpdatePreferenceRequest(d)
                return false;
            }}> 

        <div className="card-body">
            <h4 className="card-title">Profile</h4>
            <p className="card-description">Basic Information</p>

            <div className="row">
                <div className="col-md-6">
                    <Form.Group className="row">
                    <label for="ulang" className="col-sm-3 col-form-label">Language</label>
                    <div className="col-sm-9">
                        <select className="form-control" name="ulang" id="ulang" required
                            onChange={(e)=>{
                                let values = e.target.selectedOptions[0].value
                                setULang(values)
                            }}>
                            <option value="">Please select</option>
                            <option value="yue" selected={ulang=="yue"? "selected": ""}>Cantonese</option>
                            <option value="cmn" selected={ulang=="cmn"? "selected": ""}>Mandarin</option>
                            <option value="eng" selected={ulang=="eng"? "selected": ""}>English</option>
                        </select>
                    </div>
                    </Form.Group>
                </div>
                <div className="col-md-6">
                    <Form.Group className="row">
                    <label for="uco" className="col-sm-3 col-form-label">Country of Origin</label>
                    <div className="col-sm-9">
                        <select className="form-control" name="uco" id="uco"
                            onChange={(e)=>{
                                let values = e.target.selectedOptions[0].value
                                setUCO(values)
                            }}>
                            <option>Not Declare</option>
                            <option value="CN" selected={uco=="CN"? "selected": ""}>China</option>
                            <option value="HK" selected={uco=="HK"? "selected": ""}>Hong Kong</option>
                            <option value="IN" selected={uco=="IN"? "selected": ""}>India</option>
                            <option value="ID" selected={uco=="ID"? "selected": ""}>Indonesia</option>
                            <option value="JP" selected={uco=="JP"? "selected": ""}>Japan</option>
                            <option value="KR" selected={uco=="KR"? "selected": ""}>South Korea</option>
                            <option value="MY" selected={uco=="MY"? "selected": ""}>Malaysia</option>
                            <option value="PH" selected={uco=="PH"? "selected": ""}>Philippines</option>
                            <option value="TW" selected={uco=="TW"? "selected": ""}>Taiwan</option>
                            <option value="TH" selected={uco=="TH"? "selected": ""}>Thailand</option>
                            <option value="VN" selected={uco=="VN"? "selected": ""}>Vietnam</option>
                            <optgroup label="Others">
                                <option value="NA" selected={uco=="NA"? "selected": ""}>North America</option>
                                <option value="SA" selected={uco=="SA"? "selected": ""}>South America</option>
                                <option value="ER" selected={uco=="ER"? "selected": ""}>Europe</option>
                                <option value="AS" selected={uco=="AS"? "selected": ""}>Asia</option>
                                <option value="AU" selected={uco=="AU"? "selected": ""}>Australia</option>
                                <option value="AF" selected={uco=="AF"? "selected": ""}>Africa</option>
                            </optgroup>
                        </select>
                    </div>
                    </Form.Group>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <Form.Group className="row">
                    <label for="ugender" className="col-sm-3 col-form-label">Gender</label>
                    <div className="col-sm-9">
                        <select className="form-control" name="ugender" id="ugender"
                            onChange={(e)=>{
                                let values = e.target.selectedOptions[0].value
                                setUGender(values)
                            }}>
                            <option value="M" selected={ugender=="M"? "selected": ""}>Male</option>
                            <option value="F" selected={ugender=="F"? "selected": ""}>Female</option>
                            <option value="TM" selected={ugender=="TM"? "selected": ""}>Trans male</option>
                            <option value="TF" selected={ugender=="TF"? "selected": ""}>Trans female</option>
                            <option value="NB" selected={ugender=="NB"? "selected": ""}>Non-binary</option>
                            <option value="ND"  selected={ugender=="ND"? "selected": ""}>Not Declare</option>
                        </select>
                    </div>
                    </Form.Group>
                </div>
                <div className="col-md-6">
                    <Form.Group className="row">
                    <label for="udob" className="col-sm-3 col-form-label">Birth</label>
                    <div className="col-sm-9">
                    <DatePicker id="udob" className="form-control" size="lg"
                        name="udob"
                        selected={dob}
                        dateFormat="dd-MMM-yyyy"
                        onChange={e => setDOB(e)}
                    />
                    </div>
                    </Form.Group>
                </div>
            </div>
        </div>

        <div className="card-body">
            <p className="card-description">Tell us more about you</p>
            <div className="form-group row">
                <label for="uhobbies" className="col-sm-3 col-form-label">Hobbies</label>
                <div className="col-sm-9">
                    <select
                        class="form-control"
                        name="uhobbies[]"
                        id="uhobbies"
                        multiple
                        data-allow-new="true"
                        data-allow-clear="1"
                        onChange={(e)=>{
                            let values = Array.from(e.target.selectedOptions, option => option.value);
                            setUHobbies(values)
                        }}>
                        <HobbyList hobbies={user.hobbies} />
                    </select>

                </div>
            </div>

            <div className="form-group row">
                <label for="bio" className="col-sm-3 col-form-label">Bio</label>
                <div className="col-sm-9">
                    <textarea class="form-control form-control-lg" id="bio" rows="5" value={bio} onChange={(e)=>setBio(e.target.value)}></textarea>
                </div>
            </div>

            <div className="form-group row">
                <label for="hashtags" className="col-sm-3 col-form-label">Hashtags</label>
                <div className="col-sm-9">
                    <select
                        class="form-select"
                        name="hashtags[]"
                        id="hashtags"
                        multiple
                        data-allow-new="true"
                        data-allow-clear="1"
                        onChange={(e)=>{
                            let values = Array.from(e.target.selectedOptions, option => option.value);
                            setHashtags(values)
                        }}>
                    {hashtags.map((val) => (<option value={val} selected>{val}</option>) )}
                    </select>

                </div>
            </div>
        </div>


        <div className="card-body">
            <p className="card-description">What types of people you would like to meet?</p>

                <Form.Group className="row">
                    <label for="plang" className="col-sm-3 col-form-label">Language</label>
                    <div className="col-sm-9">
                        <select
                            class="form-control"
                            name="plang[]"
                            id="plang"
                            multiple
                            data-allow-clear="1"
                            data-suggestions-threshold="0"
                            required
                            onChange={(e)=>{
                                let values = Array.from(e.target.selectedOptions, option => option.value);
                                setPLang(values)
                            }}>
                            <option value="yue" selected={plang.includes("yue")? "selected": ""}>Cantonese</option>
                            <option value="cmn" selected={plang.includes("cmn")? "selected": ""}>Mandarin</option>
                            <option value="eng" selected={plang.includes("eng")? "selected": ""}>English</option>
                        </select>
                    </div>
                </Form.Group>

                <Form.Group className="row">
                    <label for="pgender" className="col-sm-3 col-form-label">Gender</label>
                    <div className="col-sm-9">
                        <select
                            class="form-control"
                            name="pgender[]"
                            id="pgender"
                            multiple
                            data-allow-clear="1"
                            data-suggestions-threshold="0"
                            onChange={(e)=>{
                                let values = Array.from(e.target.selectedOptions, option => option.value);
                                setPGender(values)
                            }}>
                            <option value="M" selected={pgender.includes("M")? "selected": ""}>Male</option>
                            <option value="F" selected={pgender.includes("F")? "selected": ""}>Female</option>
                            <option value="TM" selected={pgender.includes("TM")? "selected": ""}>Trans male</option>
                            <option value="TF" selected={pgender.includes("TF")? "selected": ""}>Trans female</option>
                            <option value="NB" selected={pgender.includes("NB")? "selected": ""}>Non-binary</option>
                            <option value="ND" selected={pgender.includes("ND")? "selected": ""}>Not Declare</option>
                        </select>
                    </div>
                </Form.Group>
                
                
                <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">Age Range</label>
                    <div className="col-sm-9">
                        <IonRangeSlider type="double" 
                            // min="12" max="50" 
                            values={ageArr}
                            from={ageFrom-12} to={ageTo-12}
                            onFinish={(e)=>{
                                setAgeFrom(e.from+12)
                                setAgeTo(e.to+12)
                            }} />
                    </div>
                </Form.Group>

            <div class="text-right">
            <button type="submit" id="submitBtn" className="btn btn-gradient-primary mr-2 disabled" onClick={(e)=>{
                if (e.target.classList.contains('disabled'))
                    e.preventDefault();
            }}>Save Change</button>
            <button type="reset" className="btn btn-light" onClick={(e)=>{e.preventDefault(); resetForm();}}>Reset</button>
            </div>
            
        </div>
        </form>
        </>
    )
}

export default ProfileSettings;