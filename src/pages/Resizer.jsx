import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import config from '../config/config';
import state from '../store';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import ChangeTabs from '../component/ChangeTabs';
import Mybutton from '../component/Mybutton';

const Resizer = () => {
    const snap=useSnapshot(state)
  return (
    <AnimatePresence>
        {!snap.intro && (
            <>
            <motion.div
              key="custom"
              className="absolute top-0 left-0 z-10"
              {...slideAnimation('left')}
            >
                      <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <ChangeTabs
                    key={tab.name}
                    tab={tab}
                    handleClick={() => {}}
                  />
                ))}

                {/* {generateTabContent()} */}
              </div>
            </div>
                

            </motion.div>
            
          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <Mybutton
              type="filled"
              title="Go Back"
              handleClick={() => state.intro = true}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
          <motion.div
            className='filtertabs-container'
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <ChangeTabs
                key={tab.name}
                tab={tab}
                isFilterTab
                // isActiveTab={activeFilterTab[tab.name]}
                // handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
            </>

        )}
    </AnimatePresence>
  )
}

export default Resizer