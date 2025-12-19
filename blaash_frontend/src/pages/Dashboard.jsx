import React,{useContext, useEffect, useState} from 'react';
import { LeftNav } from '../components/LeftNav';
import { Header } from '../components/Header';
import link from '../assets/link.svg'
import  ProductAlbums from '../components/ProductAlbums';
import { ProductsLists } from '../components/ProductsLists';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import {fetchUserDetails} from '../services/api'

const Dashboard = () => {
  const {playlists, setPlaylists} = useAuth();
  const {userEmail} = useUser();
  

 useEffect(() => {
    if (!playlists || playlists.length === 0) {
      fetchUserDetails({userEmail, setPlaylists});
    }
  }, []);
  
  return (
    <div className="bg-[#1c1c23] w-screen h-screen flex items-center justify-center p-5">
        <div className='flex bg-[#1B1B22] h-full w-full gap-7'>
            <LeftNav/>
            <div className='w-full h-full'>
              <Header/>
              <div className='w-full flex flex-col items-center mt-2'>
                  <div className='w-full h-[60px] flex justify-between items-center'>
                    <span className='font-[500] text-white text-md leading-[18.96px] flex items-center'>Product Playlists</span>
                    <button className='bg-[#017EFA] h-8 p-3 flex items-center gap-1 rounded-xl'>
                      <img src={link} alt="link icon" width={20} height={20} />
                      <span className='font-[500] text-white text-sm leading-4'>Generate Code</span>
                    </button>
                  </div>
                  
                  <div className='flex gap-3 h-full w-full'>
                    <ProductAlbums/> 
                    <ProductsLists/>                
                  </div>
              </div>
            </div>
        </div>
    </div>
  );
};

export default Dashboard;
