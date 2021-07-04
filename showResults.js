chrome.runtime.sendMessage({ todo: "showPageAction" });

const match_live = document.querySelectorAll(".matsh_live");
const iFrameContainer = document.querySelector(".m_d_l_3");
const iFrameSection = document.querySelector(".m_d_l_3 iframe");

const showResultsFunction = (show) => {
  if (show) {
    if (iFrameContainer) {
      iFrameContainer.appendChild(iFrameSection);
      iFrameContainer.querySelector("center").style.display = "none";
    }
    match_live.forEach((elm) => {
      if (
        elm.querySelector(".matsh_goal") ||
        elm.querySelector(".matsh_start") ||
        elm.querySelector(
          'li>table>tbody>tr>td:nth-child(1)[align="left"]>span:not(.matsh_non)'
        )
      ) {
        elm.classList.add("remove_results");
      }
    });
  } else {
    if (iFrameContainer) {
      iFrameContainer.querySelector("center").style.display = "block";
    }
    match_live.forEach((elm) => {
      elm.classList.remove("remove_results");
    });
  }
};

const toggleResul = document.createElement("div");
toggleResul.className = "showResultsContainer";
toggleResul.innerHTML = `
<label for="showResults">اخفاء النتائج :</label>
<input type="checkbox" id="showResults" />
`;
const bottomBar = document.querySelector(".m_2");
bottomBar.appendChild(toggleResul);

const checkBoxToggle = toggleResul.querySelector("#showResults");

chrome.storage.local.get(["isShowing"], function (result) {
  checkBoxToggle.checked = result.isShowing;
  showResultsFunction(result.isShowing);
});

checkBoxToggle.addEventListener("change", () => {
  showResultsFunction(checkBoxToggle.checked);
  chrome.storage.local.set({ isShowing: checkBoxToggle.checked });
});
