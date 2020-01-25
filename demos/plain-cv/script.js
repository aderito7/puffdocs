"use strict";
(function() {
  const example = {
    user: {
      fullNames: "John Doe",
      jobTitle: "Assistant Manager",
      email: "john@doe.com",
      contactNumber: "123 456 7890",
      website: "https://www.johndoe.com"
    },
    skills: [
      { title: "Management", level: 5 },
      { title: "Communication", level: 2 },
      { title: "Time Management", level: 4 }
    ],
    employementHistory: [
      {
        jobTitle: "Manager Intern",
        companyName: "XYZ and Associates",
        period: { from: "2012-1-1", to: "2018-4-12" },
        description: "Worked as a a Manager Intern at XYZ and Associates"
      },
      {
        jobTitle: "Assistant Manager",
        companyName: "JKL & Sons",
        period: { from: "2018-4-12", to: "Current" },
        description: "Assisting with management and running of JLK"
      }
    ],
    educationHistory: [
      {
        qualification: "BSc Management Science",
        institutionName: "ABC College"
      },
      {
        qualification: "Computer Application Technology",
        institutionName: "Computer Science Lab"
      }
    ]
  };

  const dom = {
    // title: select(".title"),
    userName: select(".user-name"),
    jobTitle: select(".job-title"),
    email: select(".email"),
    cell: select(".cell"),
    website: select(".website"),
    workExperience: select(".work-experience"),
    skills: select(".skills"),
    education: select(".education")
  };
  const params = new URLSearchParams(window.location.search);
  const guid = params.get("guid");

  console.log(typeof guid);

  guid ? getAndSetData(guid) : createDocument(example);

  /**
   *
   * @param {string} item className returns first item onlyu
   */
  function select(item) {
    return document.querySelector(item);
  }

  /**
   *
   * @param {HTMLElement} htmlElement
   * @param {string} value
   */
  function setValue(htmlElement, value) {
    htmlElement.innerText = value;
  }

  /**
   *
   * @param {HTMLElement} htmlElement
   * @param {HTMLElement} list
   */
  function setList(htmlElement, list) {
    htmlElement.appendChild(list);
  }

  /**
   *
   * @param {*} tag
   * @param {*} className
   * @param {*} innerText
   * @return {HTMLElement}
   */
  function createElement(tag, className, innerText = "") {
    const el = document.createElement(tag);
    el.classList.add(className);
    el.innerText = innerText;
    return el;
  }

  /**
   *
   * @param {HTMLElement} parent
   * @param {Array<HTMLElement>} children
   */
  function appendChildren(parent, children) {
    Array.from(children).forEach(child => {
      parent.appendChild(child);
    });
  }

  function getWorkExperience(work) {
    const container = createElement("div", "container");

    const jobTitle = createElement("span", "job-title", work.jobTitle);
    const period = createElement(
      "span",
      "period",
      `${work.period.from} to ${work.period.to}`
    );

    const description = createElement("span", "description", work.description);

    appendChildren(container, [jobTitle, period, description]);

    return container;
  }

  function getEducationHistory(education) {
    const container = createElement("div", "container");

    const qualification = createElement(
      "span",
      "qualification",
      education.qualification
    );
    const institutionName = createElement(
      "span",
      "institution-name",
      education.institutionName
    );

    appendChildren(container, [qualification, institutionName]);

    return container;
  }

  function getSkill(skill) {
    const container = createElement("div", "container");
    const title = createElement("span", "title", skill.title);
    const level = createElement("span", "level");
    level.setAttribute("level", skill.level);

    appendChildren(container, [title, level]);
    return container;
  }

  /**
   *
   * @param {example} data
   */
  function createDocument(data) {
    // setValue(dom.title, "Plain CV Template by PuffDocs©");
    setValue(dom.userName, data.user.fullNames);
    setValue(dom.jobTitle, data.user.jobTitle);

    setValue(dom.email, data.user.email);
    setValue(dom.cell, data.user.contactNumber);
    setValue(dom.website, data.user.website);

    data.employementHistory.forEach(employment => {
      dom.workExperience.appendChild(getWorkExperience(employment));
    });

    data.educationHistory.forEach(education => {
      dom.education.appendChild(getEducationHistory(education));
    });

    data.skills.forEach(skill => {
      dom.skills.appendChild(getSkill(skill));
    });
    // dom.skills.appendChild(getSkill(data.skills[0]));
  }

  function getAndSetData(guid) {
    var requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    return fetch(
      "http://localhost:3000/api/v1.0/demos/data/" + guid,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        createDocument(result);
      })
      .catch(error => console.log("error", error));
  }
})();
