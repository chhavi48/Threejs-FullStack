import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";

import config from "../config/config";
import state from "../store";
import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import ChangeTabs from "../component/ChangeTabs";
import Mybutton from "../component/Mybutton";
import AiFille from "../component/AiFille";
import AiImage from "../component/AiImage";
import AiColor from "../component/AiColor";

const Resizer = () => {
  const snap = useSnapshot(state);
  const [file, setfile] = useState("");
  const [prompt, setprompt] = useState("");
  const [generateImage, setgenerateImage] = useState(false);
  const [activeTabEdit, setactiveTabEdit] = useState("");
  const [activeTabFilter, setactiveTabFilter] = useState({
    logoShirt: true,
    stylishShirt: false,
  })
  const showTabButtons = () => {
    switch (activeTabEdit) {
      case "colorpicker":
        return <AiColor />
      case "filepicker":
        return <AiFille
          file={file}
          setfile={setfile}
          readFile={resetFile}
        />
      case "aipicker":
        return <AiImage
          prompt={prompt}
          setprompt={setprompt}
          generateImage={generateImage}
          handleSubmit={handleSubmit}
        />
      default:
        return null;
    }
  }

  const handleSubmit=async (type)=>{
    if(!prompt) return alert("Please enter a prompt");
    try{
      setgenerateImage(true);

      const response = await fetch('http://localhost:8080/api/v1/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
        })
      })

      const data = await response.json();

      handleDecals(type, `data:image/png;base64,${data.photo}`)


    }catch(err){
      alert(err);
    } finally {
       setgenerateImage(false)
       setactiveTabEdit("")
    }
  }

  const handleDecals=(type,result) => {
    const decaltype=DecalTypes[type];
    state[decaltype.stateProperty] = result;
    if(!activeTabFilter[decaltype.filterTab]){
      handleActiveFilter(decaltype.filterTab)
    }
  }

  const handleActiveFilter=(tabName) => {
    switch(tabName){
      case "logoShirt":
        state.isLogoTexture=!activeTabFilter[tabName];
        break;

      case "stylishShirt":
        state.isFullTexture=!activeTabFilter[tabName];

        default:
          state.isFullTexture=false;
          state.isLogoTexture=true;
          
    }

  }


  const resetFile=(type) => {
    reader(file)
    .then((result) => {
      handleDecals(type,result);
      setactiveTabEdit("")

    })
  }


  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <ChangeTabs key={tab.name} tab={tab} handleClick={() => setactiveTabEdit(tab.name)} />
                ))}

                {/* {generateTabContent()} */}
                {showTabButtons()}
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
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
          <motion.div
            className="filtertabs-container"
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
  );
};

export default Resizer;
