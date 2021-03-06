/*!
    * Start Bootstrap - SB Admin Pro v2.0.4 (https://shop.startbootstrap.com/product/sb-admin-pro)
    * Copyright 2013-2022 Start Bootstrap
    * Licensed under SEE_LICENSE (https://github.com/StartBootstrap/sb-admin-pro/blob/master/LICENSE)
    */
window.addEventListener('DOMContentLoaded', event => {
    // Activate feather
    feather.replace();

    // Enable tooltips globally
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Enable popovers globally
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Activate Bootstrap scrollspy for the sticky nav component
    const stickyNav = document.body.querySelector('#stickyNav');
    if (stickyNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#stickyNav',
            offset: 82,
        });
    }

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sidenav-toggled'));
        });
    }

    // Close side navigation when width < LG
    const sidenavContent = document.body.querySelector('#layoutSidenav_content');
    if (sidenavContent) {
        sidenavContent.addEventListener('click', event => {
            const BOOTSTRAP_LG_WIDTH = 992;
            if (window.innerWidth >= 992) {
                return;
            }
            if (document.body.classList.contains("sidenav-toggled")) {
                document.body.classList.toggle("sidenav-toggled");
            }
        });
    }

    // Add active state to sidbar nav links
    let activatedPath = window.location.pathname.match(/([\w-]+\.html)/, '$1');

    if (activatedPath) {
        activatedPath = activatedPath[0];
    } else {
        activatedPath = 'index.html';
    }

    const targetAnchors = document.body.querySelectorAll('[href="' + activatedPath + '"].nav-link');

    targetAnchors.forEach(targetAnchor => {
        let parentNode = targetAnchor.parentNode;
        while (parentNode !== null && parentNode !== document.documentElement) {
            if (parentNode.classList.contains('collapse')) {
                parentNode.classList.add('show');
                const parentNavLink = document.body.querySelector(
                    '[data-bs-target="#' + parentNode.id + '"]'
                );
                parentNavLink.classList.remove('collapsed');
                parentNavLink.classList.add('active');
            }
            parentNode = parentNode.parentNode;
        }
        targetAnchor.classList.add('active');
    });
    //Init Event Listener
  const tmpls = document.querySelectorAll(".tmpl");
  const dataVars = document.querySelectorAll(".var");
  const sliders = document.querySelectorAll(".var-slide");
  const varcs = document.querySelectorAll(".var-c");

  tmpls.forEach((tmpl) =>
    tmpl.addEventListener("change", (event) => {
      if (tmpl.value == "custom") {
        if (checkCustConf()) {
          setAllConf(
            getCookie("varOne"),
            getCookie("varTwo"),
            getCookie("varThree"),
            getCookie("CbX"),
            getCookie("CbY"),
            getCookie("CbYN")
          );
        } else {
          setAllConf("0", "0", "0", "", "", "");
        }
      } else {
        tmplS = tmpl.value.split(",");
        setAllConf(tmplS[0], tmplS[1], tmplS[2], tmplS[3], tmplS[4], tmplS[5]);
      }
      getconfstr();
      updallslidertext();
    })
  );

  dataVars.forEach((dataVar) =>
    dataVar.addEventListener("change", (event) => {
      if (dataVar.getAttribute("type") == "checkbox") {
        val = dataVar.checked;
      } else if (dataVar.getAttribute("type") == "radio") {
        val = dataVar.getAttribute("id");
      } else {
        val = dataVar.value;
      }
      if (dataVar.getAttribute("type") == "radio") {
        setCookie(dataVar.getAttribute("name"), val);
      } else {
        setCookie(dataVar.getAttribute("id"), val);
      }
    })
  );

  sliders.forEach((slider) =>
    slider.addEventListener("change", (event) => {
      updallslidertext();
    })
  );

  varcs.forEach((varc) =>
    varc.addEventListener("change", (event) => {
      document.getElementById("tc").checked = true;
    })
  );

  sumBtn = document.getElementById("copySumBtn");
  sumBtn.addEventListener("click", function (event) {
    var copyText = document.getElementById("sumText");

    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);

    alert("Text Copied");
  });

  //Disabled due by HTTPS Only, Uncomment only in Production.
  newsBtn = document.getElementById("pasteNewsBtn");
  newsBtn.addEventListener("click", function (event) {
    navigator.clipboard
      .readText()
      .then(
        (clipText) => (document.getElementById("newsText").value = clipText)
      );
  });

  //End Event Listener

  //Start On Load Functions
  clrFormSet();
  startInit();
  generalAjax("sessioncheck");
  //End On Load Functions

  //Start Functions Set

  function clrFormSet() {
    $("#tokenizerForm")[0].reset();
    $("#sumText").val("");
  }

  function checkCurConf() {
    tmpl = getCookie("tmpl");
    if (tmpl != "") {
      document.getElementById(tmpl).click();
      if (getCookie("tmpl") != "tc") {
      } else {
        if (checkCustConf()) {
          setAllConf(
            getCookie("varOne"),
            getCookie("varTwo"),
            getCookie("varThree"),
            getCookie("CbX"),
            getCookie("CbY"),
            getCookie("CbYN")
          );
        } else {
          setAllConf("0", "0", "0", "", "", "");
        }
      }
    } else {
      document.getElementById("t1").click();
    }
  }

  function setSliderVal(target, val) {
    document.getElementById(target).value = val;
  }

  function checkCustConf() {
    if (
      getCookie("var1") != "undefined" &&
      getCookie("var2") != "undefined" &&
      getCookie("var3") != "undefined" &&
      getCookie("cbX") != "undefined" &&
      getCookie("cbY") != "undefined" &&
      getCookie("cbYN") != "undefined"
    ) {
      return 'false';
    } else {
      return 'true';
    }
  }

  function getconfstr() {
    checkedradio = document.querySelector('input[name = "tmpl"]:checked');
    document.getElementById("curConf").innerHTML = document.querySelector(
      'label[for="' + checkedradio.getAttribute("id") + '"]'
    ).innerHTML;
  }

  function setCbCond(target, val) {
    document.getElementById(target).checked = val;
  }

  function startInit() {
    checkCurConf();
  }

  function updallslidertext() {
    sliders.forEach((slider) => {
      document.getElementById(slider.dataset.target).innerHTML = slider.value;
    });
  }

  function setAllConf(var1, var2, var3, var4, var5, var6) {
    setSliderVal("varOne", var1);
    setSliderVal("varTwo", var2);
    setSliderVal("varThree", var3);
    setCbCond("cbX", var4);
    setCbCond("cbY", var5);
    setCbCond("cbYN", var6);
  }

  function setCookie(cname, cvalue) {
    const d = new Date();
    d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function respAct(act){
    if (act == "refresh"){
      window.location.reload();
    }
  }
  //End Functions Set

  //Start Jquery AJAX Functions
  let alertMsg = $("#alertMessage");

  function generalAjax(action) {
    $.ajax({
      url: "action.php",
      method: "POST",
      data: {
        action: action,
      },
      dataType: "JSON",
      success: function (data) {
        if (data.error != "") {
          alertMsg.addClass(data.alert).html(data.error);
          setTimeout(function () {
            alertMsg.removeClass(data.alert).html("");
          }, 3000);
        } else {
          alertMsg.addClass(data.alert).html(data.success);
          setTimeout(function () {
            alertMsg.removeClass(data.alert).html("");
          }, 3000);
        }
        setTimeout(function () {
          respAct(data.respact);
        }, 500);
        
      },
    });
  }

  let tokenizerform = $("#tokenizerForm");
  tokenizerform.on("submit", function (event) {
    event.preventDefault();
    if (!tokenizerform[0].checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      $.ajax({
        url: "action.php",
        method: "POST",
        data: new FormData(this),
        dataType: "json",
        contentType: false,
        cache: false,
        processData: false,
        beforeSend: function () {
          $("#submitBtn").attr("disabled", true).html("Wait...");
        },
        success: function (data) {
          $("#submitBtn").attr("disabled", false).html("Send");
          if (data.error != "") {
            alertMsg.addClass(data.alert).html(data.error);
            setTimeout(function () {
              alertMsg.removeClass(data.alert).html("");
            }, 3000);
          } else {
            alertMsg.addClass(data.alert).html(data.success);
            setTimeout(function () {
              alertMsg.removeClass(data.alert).html("");
            }, 3000);
            $("#sumText").val(data.sumtext);
          }
        },
      });
    }
  });
  //End Jquery AJAX Functions
});



