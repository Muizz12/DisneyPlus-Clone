import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { setMovies } from '../features/movie/movieSlice';
import { selectUserName } from '../features/users/userSlice';
import db from '../firebase';
import Diseny from './Diseny';
import ImageSlider from './ImageSlider';
import Originals from './Originals';
import Recommended from './Recommended';
import Trending from './Trending';
import Viewers from './Viewers';


function Home() {
    const dispatch=useDispatch();
    const userName=useSelector(selectUserName);
    let recommends=[];
    let newDisneys=[];
    let originals= [];
    let trending=[];

    useEffect(() => {
        
        db.collection("movies").onSnapshot((snapshot) => {
          snapshot.docs.map((doc) => {
            //console.log(recommends);
            switch (doc.data().type) {
              case "recommend":
                recommends = [...recommends, { id: doc.id, ...doc.data() }];
                break;
    
              case "new":
                newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
                break;
    
              case "original":
                originals = [...originals, { id: doc.id, ...doc.data() }];
                break;
    
              case "trending":
                trending = [...trending, { id: doc.id, ...doc.data() }];
                break;
            }
          });
    
          dispatch(
            setMovies({
              r: recommends,
              ND: newDisneys,
              o: originals,
              T: trending,
              
            })
          );
          
        });
      }, [userName]);
   
    return (
       <Container>
           <ImageSlider/>
           <Viewers/>
           <Recommended/>
           <Diseny/>
           <Originals/>
           <Trending/>
       </Container>
    )
}

export default Home

const Container =styled.main`
position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  overflow-y:hidden ;
  
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }


`;

