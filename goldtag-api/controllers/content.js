const Dynamic = require("../models/Dynamic");
const SubHeader = require("../models/SubHeader");
const Website = require("../models/Website");
const { BadRequestError } = require("../errors/index");

const getContent = async (req, res, next) => {
  try {
    const { website, subheader } = req.params;
    let websites = [];
    let subs = [];
    if (website === "all") {
      websites = await Website.find({ isActive: true });
    } else {
      const websit = await Website.findOne({ title: website, isActive: true });
      if(!websit){
        throw new BadRequestError(`Could not find any active websites with the name of -${website}- `)
      }
      websites.push(websit);
    }
    if (!websites.length) {
      throw new BadRequestError("No websites found");
    }
    let websiteContents = {};
    for (const website of websites) {
      if (!website.isActive) {
        continue;
      }
      const webID = website._id;
      if (subheader === "all") {
        subs = await SubHeader.find({ belong: webID, isActive: true });
      } else {
        const subb = await SubHeader.findOne({
          belong: webID,
          title: subheader,
          isActive: true,
        });
        if (!subb) {
          throw new BadRequestError(
            `No subheader found with  *${subheader}* title and parent`
          );
        } 
        subs.push(subb);
      }
      let subheaders = {};
      if (subs) {
        for (const sub of subs) {
          const subID = sub._id;
          const subContents = await Dynamic.find({
            belong: subID,
            isActive: true,
          });
          subheaders[sub.title] = {};
          if (subContents) {
            for (cont of subContents) {
              subheaders[sub.title][cont.category] = {};
              const { inContent, title, dynamicID } = cont;
              subheaders[sub.title][cont.category]["dynamicID"] = dynamicID;
              if (title) {
                subheaders[sub.title][cont.category]["title"] = title;
              }
              if (inContent) {
                for (property of inContent) {
                  if (
                    (typeof property[1] === `string` && property[1].length) ||
                    (typeof property[1] === `object` &&
                      Object.keys(property[1]).length)
                  ) {
                    subheaders[sub.title][cont.category][property[0]] =
                      property[1];
                  }
                }
              }
            }
          }
        }
      }
      
      websiteContents[website.title] = {
        subheaders: subheaders,
      };
    }
    return res.status(200).json({
      success: true,
      message: "Fetching contents successfull ",
      data: websiteContents,
    });
  } catch (error) {
    next(error);
  }
};

const addSth = async (req, res, next) => {
  try {
    const { addContent } = req.body;
    if (!addContent) {
      throw new BadRequestError("No content found as addcontent");
    }
    if (!addContent.length) {
      throw new BadRequestError("No content found on addcontent");
    }
    let error = [];
    for (content of addContent) {
      let { website, subheaders} = content;
      if (!website) {
        website = "Goldtag App";
      }
      const web = (await Website.findOne({ title: website }))
        ? await Website.findOne({ title: website })
        : await Website.create({ title: website });
      const webID = web._id;
      if (subheaders) {
        for (const sub of subheaders) {
          const sbTitle = sub.title ? sub.title : "Main";
          let subb = await SubHeader.findOne({
            belong: webID,
            title: sbTitle,
          });
          if (!subb) {
            subb = await SubHeader.create({ belong: webID, title: sbTitle });
          }
          const subID = subb._id;
          const { contentCount } = subb;
          if (sub.content) {
            const { content } = sub;
            if (Object.keys(content).length) {
              const keyList = Object.keys(content);
              const valueList = Object.values(content);
              let dynCount = 0;
              for (let i = 0; i < keyList.length; i++) {
                const curKey = keyList[i];
                const curValue = valueList[i];
                let dynamicObject = {};
                dynamicObject["belong"] = subID;
                dynamicObject["category"] = curKey;
                if (curValue.title) {
                  dynamicObject["title"] = curValue.title;
                }
                const curValuesKeys = Object.keys(curValue);
                const curValuesValues = Object.values(curValue);
                dynamicObject["inContent"] = [];
                for (let j = 0; j < curValuesKeys.length; j++) {
                  if (curValuesKeys[j] !== "title")
                    dynamicObject["inContent"].push([
                      curValuesKeys[j],
                      curValuesValues[j],
                    ]);
                }
                const doesExist = await Dynamic.findOne({ ...dynamicObject });
                if (doesExist) {
                  error.push(
                    `Dynamic object with category:${doesExist.category}, id:${doesExist._id} already exists`
                  );
                } else {
                  dynamicObject["dynamicID"] = dynCount + contentCount;
                  await Dynamic.create({ ...dynamicObject });
                  dynCount++;
                }
              }
              await SubHeader.findByIdAndUpdate(subID, {
                contentCount: contentCount + dynCount,
              });
            }
          } else {
            error.push(
              `No content found in ${sbTitle} SubHeader, if its on purpose please ignore this error `
            );
          }
        }
      } else {
        error.push(
          `No subheaders found in ${website} website, if its on purpose please ignore this error `
        );
      }
    }
    if (error.length) {
      return res.status(200).json({
        success: true,
        message: `Adding successfull but there were some errors : ${error}`,
        data: {},
      });
    }
    return res.status(200).json({
      success: true,
      message: `Adding successfull without any errors`,
    });
  } catch (error) {
    next(error);
  }
};

const editSth = async (req, res, next) => {
  try {
    let { contentType, path, edit } = req.body;
    const typeList = ["website", "dynamic", "subheader"];
    const eror = !typeList.includes(contentType)
      ? ["contentType", typeList]
      : null;
    if (eror) {
      throw new BadRequestError(
        `${eror[0]} ,check the spelling and whitespaces, be sure value is in the list; ${eror[1]}`
      );
    }
    let error = [];
    const isWeb = contentType === "website";
    const isSub = contentType === "subheader";
    const isDynamic = contentType === "dynamic";
    let changing = {};
    if (!edit) {
      throw new BadRequestError(
        "Given edit variable is not valid; edit variable is needed for editing"
      );
    }
    let changed = [];
    const ids = Object.keys(edit);
    const changes = Object.values(edit);
    for (const chng of changes) {
      if (isWeb) {
        const titl = ids[changes.indexOf(chng)];
        const found = await Website.findOne({ title: titl });
        if (!found) {
          error.push(`No websites found with title: ${titl}`);
        } else {
          const subcKeys = Object.keys(chng);
          let chngObj = {};
          for (const subc of subcKeys) {
            if (subc === "title") {
              chngObj["title"] = chng[subc];
            } else if (subc === "isActive") {
              chngObj["isActive"] = chng[subc];
            } else {
              error.push(`Non valid change variable while editing  ${titl}`);
            }
          }
          if (chngObj) {
            changing[found._id] = chngObj;
          }
        }
      }
      if (isSub) {
        if (!path.website) {
          throw new BadRequestError(
            `To edit content, path variables should be given`
          );
        }
        const fund = await Website.findOne({ title: path.website });
        if (!fund) {
          throw new BadRequestError(
            `Cannot find parent website with title ${path.website}, please type in valid values`
          );
        }
        const titl = ids[changes.indexOf(chng)];
        const found = await SubHeader.findOne({
          title: titl,
          belong: fund._id,
        });
        if (!found) {
          error.push(
            `No subheaders found with title: ${titl} and parent website ${fund.title}`
          );
        } else {
          const subcKeys = Object.keys(chng);
          let chngObj = {};
          for (const subc of subcKeys) {
            if (subc === "title") {
              chngObj["title"] = chng[subc];
            } else if (subc === "isActive") {
              chngObj["isActive"] = chng[subc];
            } else {
              error.push(`Non valid change variable while editing ${titl}`);
            }
          }
          if (chngObj) {
            changing[found._id] = chngObj;
          }
        }
      }
      if (isDynamic) {
        if (!path.website || !path.subheader) {
          throw new BadRequestError(
            `To edit content, proper path variables should be given`
          );
        }
        const webfund = await Website.findOne({ title: path.website });
        if (!webfund) {
          throw new BadRequestError(
            `Cannot find parent website with title ${path.website}, please type in valid values`
          );
        }
        const subfund = await SubHeader.findOne({
          title: path.subheader,
          belong: webfund._id,
        });
        const titl = ids[changes.indexOf(chng)];
        if (isNaN(titl)) {
          error.push(
            `Given identifier is not valid for Dynamic contents, please type in a dynamicID as edit key`
          );
        } else {
          const found = await Dynamic.findOne({
            dynamicID: titl,
            belong: subfund._id,
          });
          if (!found) {
            error.push(
              `No Dynamic contents found with dynamicID: ${titl} and parent subheader ${subfund.title}`
            );
          } else {
            const subcKeys = Object.keys(chng);
            let chngObj = {};
            let incnt = [];
            let incntobj = {};
            for (const cont of found.inContent) {
              incntobj[cont[0]] = cont[1];
            }
            for (const subc of subcKeys) {
              if (subc === "title") {
                chngObj["title"] = chng[subc];
              } else if (subc === "isActive") {
                chngObj["isActive"] = chng[subc];
              } else if (subc === "category") {
                chngObj["category"] = chng[subc];
              } else {
                incntobj[subc] = chng[subc];
              }
            }
            const incntkeys = Object.keys(incntobj);
            if (incntkeys.length) {
              for (inc of incntkeys) {
                incnt.push([inc, incntobj[inc]]);
              }
              chngObj["inContent"] = incnt;
            }
            if (chngObj) {
              changing[found._id] = chngObj;
            }
          }
        }
      }
    }
    if (Object.keys(changing).length) {
      const chngIDs = Object.keys(changing);
      const chngs = Object.values(changing);
      if (isWeb) {
        for (const chngID of chngIDs) {
          const chnSuc = await Website.findByIdAndUpdate(
            chngID,
            { ...chngs[chngIDs.indexOf(chngID)] },
            { runValidators: true, new: true }
          ).select("-__v -_id");
          if (!chnSuc) {
            error.push(`No change is done to the website with ID:${chngID}`);
          } else {
            changed.push(chnSuc);
          }
        }
      } else if (isSub) {
        for (const chngID of chngIDs) {
          const chnSuc = await SubHeader.findByIdAndUpdate(
            chngID,
            { ...chngs[chngIDs.indexOf(chngID)] },
            { runValidators: true, new: true }
          ).select("-__v -_id -belong");
          if (!chnSuc) {
            error.push(`No change is done to the subheader with ID:${chngID}`);
          } else {
            changed.push(chnSuc);
          }
        }
      } else if (isDynamic) {
        for (const chngID of chngIDs) {
          const chnSuc = await Dynamic.findByIdAndUpdate(
            chngID,
            { ...chngs[chngIDs.indexOf(chngID)] },
            { runValidators: true, new: true }
          ).select("-__v -_id -belong");
          if (!chnSuc) {
            error.push(
              `No change is done to the dynamic content with ID:${chngID}`
            );
          } else {
            changed.push(chnSuc);
          }
        }
      }
      if (error.length) {
        return res.status(200).json({
          success: true,
          message: `Some errors occured during process`,
          error: error,
          data: { changed },
        });
      } else {
        return res.status(200).json({
          success: true,
          message: `Editing is successfull without any errors`,
          data: { changed },
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: `No applicable change found`,
        error: error,
      });
    }
  } catch (error) {
    next(error);
  }
};

const deleteSth = async (req, res, next) => {
  try {
    let { contentType, action, path, toDelete, edit } = req.body;
    const actList = ["wipe", "select", "unwipe", "unselect"];
    const typeList = ["website", "dynamic", "subheader"];
    if (action) {
      action = action.toLowerCase().trim();
    }
    const eror = !typeList.includes(contentType)
      ? ["contentType", typeList]
      : !actList.includes(action)
      ? ["action", actList]
      : null;
    if (eror) {
      throw new BadRequestError(
        `${eror[0]} ,check the spelling and whitespaces, be sure value is in the list; ${eror[1]}`
      );
    }
    let error = [];
    let deleted = [];
    const doesUnWipe = action === "unwipe";
    const doesWipe = action === "wipe";
    const doesUnSelect = action === "unselect";
    const doesSelect = action === "select";
    const isWeb = contentType === "website";
    const isSub = contentType === "subheader";
    const isDynamic = contentType === "dynamic";
    let changing = {};
    if (doesWipe || doesUnWipe) {
      if (isWeb) {
        const webs = await Website.find();
        for (const web of webs) {
          changing[web._id] = { isActive: doesUnWipe };
        }
      } else if (isSub) {
        if (!path.website) {
          error.push(`To edit content, path variables should be given`);
        } else {
          const found = await Website.findOne({ title: path.website });
          if (!found) {
            throw new BadRequestError(
              `Cannot find parent website with title ${path.website}, please type in valid values`
            );
          } else {
            const subs = await SubHeader.find({
              belong: found._id,
            });
            for (const sub of subs) {
              changing[sub._id] = { isActive: doesUnWipe };
            }
          }
        }
      } else {
        if (!path.website || !path.subheader) {
          error.push(`To edit content, path variables should be given`);
        } else {
          const found = await Website.findOne({ title: path.website });
          if (!found) {
            throw new BadRequestError(
              `Cannot find parent website with title ${path.website}, please type in valid values`
            );
          } else {
            const subfound = await SubHeader.findOne({
              isActive: true,
              belong: found._id,
            });
            if (!subfound) {
              throw new BadRequestError(
                `Cannot find parent subheader with title ${path.subheader}, please type in valid values`
              );
            } else {
              const dyns = await Dynamic.find({
                belong: subfound._id,
              });
              for (const dyn of dyns) {
                changing[dyn._id] = { isActive: doesUnWipe };
              }
            }
          }
        }
      }
    } else if (doesSelect || doesUnSelect) {
      if (!toDelete) {
        throw new BadRequestError(
          "Given toDelete variable is not valid; toDelete variable is needed for deletion"
        );
      }
      if (isWeb) {
        for (webb of toDelete) {
          const webo = await Website.findOne({ title: webb });
          if (!webo) {
            error.push(`No website found on system by title ${webb}`);
          } else {
            changing[webo._id] = { isActive: doesUnSelect };
          }
        }
      } else if (isSub) {
        if (!path.website) {
          throw new BadRequestError(
            `To edit content, path variables should be given`
          );
        } else {
          const found = await Website.findOne({ title: path.website });
          if (!found) {
            throw new BadRequestError(
              `Cannot find parent website with title ${path.website}, please type in valid values`
            );
          } else {
            if (!toDelete) {
              throw new BadRequestError(
                "Given toDelete variable is not valid; toDelete variable is needed for deletion"
              );
            }
            for (subb of toDelete) {
              const subo = await SubHeader.findOne({
                belong: found._id,
                title: subb,
              });
              if (!subo) {
                error.push(`No subheader found on system by title ${subb}`);
              } else {
                changing[subo._id] = { isActive: doesUnSelect };
              }
            }
          }
        }
      } else {
        if (!toDelete) {
          throw new BadRequestError(
            "Given toDelete variable is not valid; toDelete variable is needed for deletion"
          );
        }
        if (!path.website || !path.subheader) {
          throw new BadRequestError(
            `To edit content, path variables should be given`
          );
        } else {
          const found = await Website.findOne({ title: path.website });
          if (!found) {
            throw new BadRequestError(
              `Cannot find parent website with title ${path.website}, please type in valid values`
            );
          } else {
            const subfound = await SubHeader.findOne({
              isActive: true,
              belong: found._id,
            });
            if (!subfound) {
              throw new BadRequestError(
                `Cannot find parent subheader with title ${path.subheader}, please type in valid values`
              );
            } else {
              for (const delID of toDelete) {
                if (!isNaN(delID)) {
                  const dyn = await Dynamic.findOne({
                    belong: subfound._id,
                    dynamicID: delID,
                  });
                  if (dyn) {
                    changing[dyn._id] = { isActive: doesUnSelect };
                  } else {
                    error.push(
                      `${delID} is not valid please type in a valid dynamicID `
                    );
                  }
                } else {
                  error.push(
                    `${delID} is not valid please type in a valid dynamicID `
                  );
                }
              }
            }
          }
        }
      }
    }
    if (Object.keys(changing).length) {
      const chngIDs = Object.keys(changing);
      const chngs = Object.values(changing);
      if (isWeb) {
        for (const chngID of chngIDs) {
          const chnSuc = await Website.findByIdAndUpdate(
            chngID,
            { ...chngs[chngIDs.indexOf(chngID)] },
            { runValidators: true, new: true }
          ).select("-_id -__v");
          if (!chnSuc) {
            error.push(`No change is done to the website with ID:${chngID}`);
          } else {
            deleted.push(chnSuc);
          }
        }
      } else if (isSub) {
        for (const chngID of chngIDs) {
          const chnSuc = await SubHeader.findByIdAndUpdate(
            chngID,
            { ...chngs[chngIDs.indexOf(chngID)] },
            { runValidators: true, new: true }
          ).select("-belong -_id -__v");
          if (!chnSuc) {
            error.push(`No change is done to the subheader with ID:${chngID}`);
          } else {
            deleted.push(chnSuc);
          }
        }
      } else if (isDynamic) {
        for (const chngID of chngIDs) {
          const chnSuc = await Dynamic.findByIdAndUpdate(
            chngID,
            { ...chngs[chngIDs.indexOf(chngID)] },
            { runValidators: true, new: true }
          ).select("-belong -_id -__v");
          if (!chnSuc) {
            error.push(
              `No change is done to the dynamic content with ID:${chngID}`
            );
          } else {
            deleted.push(chnSuc);
          }
        }
      }
      const process = doesUnSelect || doesUnWipe ? "Restoring" : "Deletion";
      if (error.length) {
        return res.status(200).json({
          success: true,
          message: `Some errors occured during process`,
          error: error,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: `${process} is successfull without any errors`,
          data: {},
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: `No applicable change found`,
        error: error,
      });
    }
  } catch (error) {
    next(error);
  }
};

const helpSth = async (req, res, next) => {
  try {
    const helps = ["add", "all", "delete", "edit", "get"];
    const { subject } = req.params;
    if (!subject || !helps.includes(subject)) {
      throw new BadRequestError(
        `Provided parameters are not valid, please use the following parameters to get specific or general help, ${helps}`
      );
    }
    let help = [];
    if (subject === "add" || subject === "all") {
      const addobj = {
        addContent: [
          {
            website: "SampleApp",
            subheaders: [
              {
                title: "sampleSubheaderTitle",
                content: {
                  ContentSample: {
                    title: "contentTitle",
                    idea: "ideaSample",
                    arrayProperty: ["p1", "p2", "p3"],
                    objectProperty: { title: "object title" },
                  },
                },
              },
            ],
          },
        ],
      };
      help.push({
        AddMethod: {
          sample: addobj,
          helptext: `Add function is capable of adding contents to database with syntax as sample follows. While adding each website and subheader title of them must be named uniquely. As Dynamic contents may have no-same title, each has a dynamicID based on the connected subheaders, As mentioned each dynamic content is connected to a subheader to ease finding. Each dynamic content's content is capable of store arrays,objects, numbers or strings. Tree type input allows subheaders and websites connecteed, added without any inner data(needs just title) `,
        },
      });
    }
    if (subject === "delete" || subject === "all") {
      const deleteobj = {
        contentType: "website/subheader/dynamic",
        action: "wipe/delete/unwipe/undelete",
        path: {
          website: "Goldtag App",
          subheader: "Main",
        },
        toDelete: [0, 1, 2],
      };
      help.push({
        DeleteMethod: {
          sample: deleteobj,
          helptext: `Delete function is capable of deactivating contents in database with syntax as sample follows. While deactivating websites, subheader,dynamic contents user can wipe out whole same type under that parent data type ,or delete specific contents but for specific deletion user must provide a toDelete list like in the sample, for Subheader and websites these identifiers are titles but for dynamic contents, user must provide dynamicID's.That is beacuse Dynamic contents may have no-same title, each has a dynamicID based on the connected subheaders. But deletion is not permanent, to restore deactivated ones, user can add un- prefix to actions and it will restore like deletion actions`,
        },
      });
    }
    if (subject === "edit" || subject === "all") {
      const editobj = {
        contentType: "website/subheader/dynamic",
        path: {
          website: "Goldtag App",
          subheader: "Main",
        },
        edit: {
          0: {
            idea: "Birikimin Geleceği",
            idoa: "",
            website: "Goldtag",
            slogan: "Birikim yapma!",
          },
        },
      };
      help.push({
        EditMethod: {
          sample: editobj,
          helptext: `Edit function is capable of editing contents to database with syntax as sample follows. While editing content, type and path must be provided. As Dynamic contents may have no-same title, each has a dynamicID based on the connected subheaders,thats why when specifiying editing contents, website and subheaders allow titles but dynamic contents need dynamicIDs. Each dynamic content's content is capable of store arrays,objects, numbers or strings.Each input will overwrite the current one.`,
        },
      });
    }
    if (subject === "get" || subject === "all") {
      help.push({
        GetMethod: `Get function is capable of visualising contents of database.As Dynamic contents may have no-same title, each has a dynamicID based on the connected subheaders,dynamicIDs are presented. Each dynamic content's content is capable of store arrays,objects, numbers or strings. For filtering by website or subheader title, user can use parameters `,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Here comes help",
      data: { help: help },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getContent, addSth, editSth, deleteSth, helpSth };
