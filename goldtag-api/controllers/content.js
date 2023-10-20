const Dynamic = require("../models/Dynamic");
const SubHeader = require("../models/SubHeader");
const Website = require("../models/Website");
const { BadRequestError } = require("../errors/index");

const getContent = async (req, res, next) => {
  try {
    let { id, active } = req.params;
    id = id.trim();
    active = active.trim();
    let data = [];
    const activeCheck = active === "active";
    let check = !activeCheck ? { _id: id } : { _id: id, isActive: true };
    const webb = id.length === 24 ? await Website.find({ ...check }) : [];
    const subb = id.length === 24 ? await SubHeader.find({ ...check }) : [];
    const dynn = id.length === 24 ? await Dynamic.find({ ...check }) : [];
    let websites = [];
    let subheaders = [];
    let dynamics = [];
    if (id === "all" || webb.length) {
      if (id === "all") {
        websites = activeCheck
          ? await Website.find({ isActive: true })
          : await Website.find();
      } else {
        websites = webb;
      }
      for (const web of websites) {
        let content = {};
        content["webTitle"] = web.title;
        content["webID"] = web._id;
        content["webActive"] = web.isActive;
        content["webData"] = [];
        subheaders = !activeCheck
          ? await SubHeader.find({ belong: web._id })
          : await SubHeader.find({ belong: web._id, isActive: true });
        for (const sub of subheaders) {
          let subContent = {};
          subContent["subTitle"] = sub.title;
          subContent["subID"] = sub._id;
          subContent["subActive"] = sub.isActive;
          subContent["subData"] = [];
          dynamics = !activeCheck
            ? await Dynamic.find({
                belong: sub._id,
              })
            : await Dynamic.find({
                belong: sub._id,
                isActive: true,
              });
          for (const dyn of dynamics) {
            let dynContent = {};
            dynContent["dynID"] = dyn._id;
            const { inContent, title, isActive, category } = dyn;
            if (title) {
              dynContent["dynTitle"] = title;
            }
            dynContent["dynActive"] = isActive;
            dynContent["category"] = category;
            if (inContent) {
              for (property of inContent) {
                if (
                  (typeof property[1] === `string` && property[1].length) ||
                  (typeof property[1] === `object` &&
                    Object.keys(property[1]).length)
                ) {
                  dynContent[property[0]] = property[1];
                }
              }
            }
            subContent["subData"].push(dynContent);
          }
          content["webData"].push(subContent);
        }
        data.push(content);
      }
    } else {
      if (subb.length) {
        subheaders = subb;
        for (const sub of subheaders) {
          let subContent = {};
          subContent["subTitle"] = sub.title;
          subContent["subID"] = sub._id;
          subContent["subActive"] = sub.isActive;
          subContent["subData"] = [];
          dynamics = !activeCheck
            ? await Dynamic.find({
                belong: sub._id,
              })
            : await Dynamic.find({
                belong: sub._id,
                isActive: true,
              });
          for (const dyn of dynamics) {
            let dynContent = {};
            dynContent["dynID"] = dyn._id;
            const { inContent, title, isActive, category } = dyn;
            if (title) {
              dynContent["dynTitle"] = title;
            }
            dynContent["dynActive"] = isActive;
            dynContent["category"] = category;
            if (inContent) {
              for (property of inContent) {
                if (
                  (typeof property[1] === `string` && property[1].length) ||
                  (typeof property[1] === `object` &&
                    Object.keys(property[1]).length)
                ) {
                  dynContent[property[0]] = property[1];
                }
              }
            }
            subContent["subData"].push(dynContent);
          }
          data.push(subContent);
        }
      } else if (dynn.length) {
        dynamics = dynn;
        for (const dyn of dynamics) {
          let dynContent = {};
          dynContent["dynID"] = dyn._id;
          const { inContent, title, isActive, category } = dyn;
          if (title) {
            dynContent["dynTitle"] = title;
          }
          dynContent["dynActive"] = isActive;
          dynContent["category"] = category;
          if (inContent) {
            for (property of inContent) {
              if (
                (typeof property[1] === `string` && property[1].length) ||
                (typeof property[1] === `object` &&
                  Object.keys(property[1]).length)
              ) {
                dynContent[property[0]] = property[1];
              }
            }
          }
          data.push(dynContent);
        }
      }
    }
    if (!data.length) {
      return res.status(400).json({
        success: false,
        error: "No content found with given criterias",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Fetching contents successfull ",
      data: { content: data },
    });
  } catch (error) {
    next(error);
  }
};

const addSth = async (req, res, next) => {
  try {
    let { belongId } = req.params;
    belongId = belongId.trim();
    const { add } = req.user;
    if (!add) {
      throw new BadRequestError("Please enter add contents with 'add' key");
    }
    const webb =
      belongId.length === 24 ? [await Website.findById(belongId)] : [];
    const subb =
      belongId.length === 24 ? [await SubHeader.findById(belongId)] : [];
    const dynn =
      belongId.length === 24 ? [await Dynamic.findById(belongId)] : [];
    let error = [];
    let success = [];
    if (belongId === "all") {
      for (addObj of add) {
        let webObj = {};
        const wbkeys = Object.keys(addObj);
        if (!wbkeys.includes("title")) {
          error.push(`Please add a title to website `);
          continue;
        } else {
          try {
            const web = await Website.create({ title: addObj["title"] });
            webObj["title"] = addObj["title"];
            webObj["webID"] = web._id;
          } catch (error) {
            error.push(error);
            continue;
          }
          if (wbkeys.includes("content")) {
            webObj["content"] = [];
            for (let subAddObj of addObj["content"]) {
              let subObj = {};
              const sbkeys = Object.keys(subAddObj);
              if (!sbkeys.includes("title")) {
                error.push(
                  `Please check the ${addObj["content"].indexOf(
                    subAddObj
                  )}th subheader of ${addObj["title"]} website  `
                );
                continue;
              } else {
                try {
                  const sub = await SubHeader.create({
                    belong: web._id,
                    title: subAddObj["title"],
                  });
                  subObj["title"] = subAddObj["title"];
                  subObj["subID"] = sub._id;
                } catch (error) {
                  error.push(error);
                  continue;
                }
                if (sbkeys.includes("content")) {
                  subObj["content"] = [];
                  for (dynAddObj of subAddObj["content"]) {
                    dynObj = {};
                    const dnkeys = Object.keys(dynAddObj);
                    if (!dnkeys.includes("category")) {
                      error.push(
                        `please add a category to ${subAddObj.indexOf(
                          dynAddObj
                        )}th dynamic content of subheader with id:${sub._id}`
                      );
                      continue;
                    }
                    let dnObject = {};
                    dnObject["inContent"] = [];
                    for (dnkey of dnkeys) {
                      if (["title", "category"].includes(dnkey)) {
                        dnObject[dnkey] = dynAddObj[dnkey];
                      } else {
                        dnObject["inContent"].push([dnkey, dynAddObj[dnkey]]);
                      }
                    }
                    dynObj = dnObject;
                    dnObject["belong"] = sub._id;
                    try {
                      const dyn = await Dynamic.create({ ...dnObject });
                      dynObj["dynID"] = dyn._id;
                      subObj["content"].push(dynObj);
                    } catch (error) {
                      error.push(error);
                      continue;
                    }
                  }
                }
                webObj["content"].push(subObj);
              }
            }
          }
          success.push(webObj);
        }
      }
    } else if (webb.length) {
      for (let subAddObj of add) {
        let subObj = {};
        const sbkeys = Object.keys(subAddObj);
        if (!sbkeys.includes("title")) {
          error.push(
            `Please check the ${addObj["content"].indexOf(
              subAddObj
            )}th subheader of ${addObj["title"]} website `
          );
          continue;
        } else {
          try {
            const sub = await SubHeader.create({
              belong: web._id,
              title: subAddObj["title"],
            });
            subObj["title"] = subAddObj["title"];
            subObj["subID"] = sub._id;
          } catch (error) {
            error.push(error);
            continue;
          }
          if (sbkeys.includes("content")) {
            subObj["content"] = [];
            for (dynAddObj of subAddObj["content"]) {
              dynObj = {};
              const dnkeys = Object.keys(dynAddObj);
              if (!dnkeys.includes("category")) {
                error.push(
                  `please add a category to ${subAddObj.indexOf(
                    dynAddObj
                  )}th dynamic content of subheader with id:${sub._id}`
                );
                continue;
              }
              let dnObject = {};
              dnObject["inContent"] = [];
              for (dnkey of dnkeys) {
                if (["title", "category"].includes(dnkey)) {
                  dnObject[dnkey] = dynAddObj[dnkey];
                } else {
                  dnObject["inContent"].push([dnkey, dynAddObj[dnkey]]);
                }
              }
              dynObj = dnObject;
              dnObject["belong"] = sub._id;
              try {
                const dyn = await Dynamic.create({ ...dnObject });
                dynObj["dynID"] = dyn._id;
                subObj["content"].push(dynObj);
              } catch (error) {
                error.push(error);
                continue;
              }
            }
          }
          success.push(dynObj);
        }
      }
    } else if (subb.length) {
      for (dynAddObj of add) {
        dynObj = {};
        const dnkeys = Object.keys(dynAddObj);
        let dnObject = {};
        if (!dnkeys.includes("category")) {
          error.push(
            `please add a category to ${add.indexOf(
              dynAddObj
            )}th dynamic content`
          );
          continue;
        }
        dnObject["inContent"] = [];
        for (dnkey of dnkeys) {
          if (["title", "category"].includes(dnkey)) {
            dnObject[dnkey] = dynAddObj[dnkey];
          } else {
            dnObject["inContent"].push([dnkey, dynAddObj[dnkey]]);
          }
        }
        dynObj = dnObject;
        dnObject["belong"] = sub._id;
        try {
          const dyn = await Dynamic.create({ ...dnObject });
          dynObj["dynID"] = dyn._id;
          subObj["content"].push(dynObj);
        } catch (error) {
          error.push(error);
          continue;
        }
        success.push(subObj);
      }
    } else if (dynn.length) {
      for (dynAddObj of add) {
        dynObj = {};
        const dnkeys = Object.keys(dynAddObj);
        let dnObject = {};
        dnObject["inContent"] = [];
        for (dnkey of dnkeys) {
          if (["title", "category"].includes(dnkey)) {
            dnObject[dnkey] = dynAddObj[dnkey];
          } else {
            dnObject["inContent"].push([dnkey, dynAddObj[dnkey]]);
          }
        }
        dynObj = dnObject;
        try {
          const dyn = await Dynamic.findByIdAndUpdate(dynn._id, {
            ...dnObject,
          });
          dynObj["dynID"] = dyn._id;
          subObj["content"].push(dynObj);
        } catch (error) {
          error.push(error);
          continue;
        }
        success.push(dynObj);
      }
    }else{
      throw new BadRequestError(`given id is not valid for any content type `)
    }
    if (error.length) {
      if (success.length) {
        return res.status(200).json({
          success: true,
          message: `some content is added to db but there were some errors: ${error}`,
          data: { added: success },
        });
      } else {
        return res.status(200).json({
          success: false,
          error: error,
        });
      }
    }
    return res.status(200).json({
      success: true,
      message: `Adding successfull without any errors`,
      data: { added: success },
    });
  } catch (error) {
    next(error);
  }
};

const editSth = async (req, res, next) => {
  try {
    let { editId } = req.params;
    editId = editId.trim();
    const { edit } = req.body;
    if (!edit) {
      throw new BadRequestError("Please enter edit contents with 'edit' key");
    }
    const webb = editId.length === 24 ? await Website.findById(editId) : null;
    const subb = editId.length === 24 ? await SubHeader.findById(editId) :null;
    const dynn = editId.length === 24 ? await Dynamic.findById(editId) : null;
    let error = [];
    let success = [];
    if (webb) {
      let webEditObj = {};
      if (edit.title) {
        webEditObj["title"] = edit["title"];
        webEditObj["isActive"]=true
        const editedWeb = await Website.findByIdAndUpdate(
          webb._id,
          { ...webEditObj },
          { new: true, runValidators: true }
        );
        success.push(editedWeb);
      } else {
        error.push(
          `Such properties is not accepted in website content editing`
        );
      }
    } else if (subb) {
      let subEditObj = {};
      const subEditKeys = Object.keys(edit);
      for (const subEdit of subEditKeys) {
        if (subEdit === "title") {
          subEditObj["title"] = edit["title"];
        } else if (subEdit === "belong") {
          const parentFound = await Website.findById(edit["belong"]);
          if (!parentFound) {
            error.push(
              `No parent wesbite found with id:${edit["belong"]} please enter a valid id `
            );
          }
        } else {
          error.push(
            `Such properties is not accepted in subheader content editing`
          );
        }
      }
      if (subEditObj) {
        subEditObj["isActive"]=true
        const editedSub = await SubHeader.findByIdAndUpdate(
          subb._id,
          {
            ...subEditObj,
          },
          { new: true, runValidators: true }
        );
        success.push(editedSub);
      }
    } else if (dynn) {
      const dnkeys = Object.keys(edit);
      let dnObject = {};
      dnObject["inContent"] = [];
      let incntobj = {};
      for (const cont of dynn.inContent) {
        incntobj[cont[0]] = cont[1];
      }
      for (const dnkey of dnkeys) {
        if (["title", "category"].includes(dnkey)) {
          dnObject[dnkey] = edit[dnkey];
        } else if (dnkey === "belong") {
          const parentFound = await SubHeader.findById(edit["belong"]);
          if (!parentFound) {
            error.push(
              `No parent subheader found with id:${edit["belong"]} please enter a valid id `
            );
          }
        } else {
          incntobj[dnkey] = edit[dnkey];
        }
      }
      const incntkeys = Object.keys(incntobj);
      if (incntkeys.length) {
        for (const incntkey of incntkeys) {
          dnObject["inContent"].push([incntkey, incntobj[incntkey]]);
        }
      }
      try {
        if(dnObject){
          dnObject['isActive']=true
        }
        const dyn = await Dynamic.findByIdAndUpdate(
          dynn._id,
          {
            ...dnObject,
          },
          { new: true, runValidators: true }
        );
        success.push(dyn);
      } catch (error) {
        error.push(error);
      }
    }
    if (error.length) {
      if (success.length) {
        return res.status(200).json({
          success: true,
          message: `some content is edited at db but there were some errors: ${error}`,
          data: { edited: success },
        });
      } else {
        return res.status(200).json({
          success: false,
          error: error,
        });
      }
    }
    return res.status(200).json({
      success: true,
      message: `Editing successfull without any errors`,
      data: { edited: success },
    });
  } catch (error) {
    next(error);
  }
};

const deleteSth = async (req, res, next) => {
  try {
    let { id } = req.params;
    const toDelete =req.body
    id=id.trim()
    const webb = id.length === 24 ? await Website.findById(id) : null;
    const subb = id.length === 24 ? await SubHeader.findById(id) : null;
    const dynn = id.length === 24 ? await Dynamic.findById(id) : null;
    let error = [];
    let success = [];
    if (webb) {
      const activeness=webb.isActive
      const chngWeb=await Website.findByIdAndUpdate(webb._id,{isActive:activeness})
      if (chngWeb) {
        
        success.push(chngWeb);
      } else {
        error.push(
          `Error occured while process with id:${webb._id}`
        );
      }
    } else if (subb) {
      const activeness=subb.isActive
      const chngSub=await SubHeader.findByIdAndUpdate(subb._id,{isActive:activeness})
      if (chngSub) {
        success.push(chngSub);
      } else {
        error.push(
          `Error occured while process with id:${subb._id}`
        );
      }
    } else if (dynn) {
      const dnkeys = Object.keys(toDelete);
      let dnObject = {};
      dnObject["inContent"] = [];
      let incntobj = {};
      for (const cont of dynn.inContent) {
        incntobj[cont[0]] = cont[1];
      }
      for (const dnkey of dnkeys) {
        if (["title", "category"].includes(dnkey)) {
          dnObject[dnkey] = toDelete[dnkey];
        } else if (dnkey === "belong") {
          const parentFound = await SubHeader.findById(toDelete["belong"]);
          if (!parentFound) {
            error.push(
              `No parent subheader found with id:${edit["belong"]} please enter a valid id `
            );
          }
        } else {
          incntobj[dnkey] = edit[dnkey];
        }
      }
      const incntkeys = Object.keys(incntobj);
      if (incntkeys.length) {
        for (const incntkey of incntkeys) {
          dnObject["inContent"].push([incntkey, incntobj[incntkey]]);
        }
      }
      try {
        const dyn = await Dynamic.findByIdAndUpdate(dynn._id, {
          ...dnObject,
        });
        success.push(dyn);
      } catch (error) {
        error.push(error);
      }
    }else{
      throw new BadRequestError(`given id is not valid for any content type `)
    }
    if (error.length) {
      if (success.length) {
        return res.status(200).json({
          success: true,
          message: `some content is edited at db but there were some errors: ${error}`,
          data: { edited: success },
        });
      } else {
        return res.status(200).json({
          success: false,
          error: error,
        });
      }
    }
    return res.status(200).json({
      success: true,
      message: `Editing successfull without any errors`,
      data: { edited: success },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getContent, addSth, editSth, deleteSth };
