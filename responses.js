const usecase = `
<p>
Thank you for answering the questions.
</p>

<p>
Based on your answers, we’d like to recommend using <strong>HuggingFace to streamline your ESG research process</strong>. 
Using HuggingFace, you can easily generate data mining scripts to extract and synthesize a large amount of information from various sources such as 
MSCI ESG Ratings, The Carbon Disclosure Project, Refinitiv, The World Bank’s Sovereign ESG Portal. 
</p>
<p>
This use case <strong>takes only 3 hours</strong> to learn & implement and makes research 41% more efficient according to users similar to you, 
which means you will save 26 hours per month if you implement this use case!
</p>
`;


const upskillingPlan = `<h3>Project: HuggingFace to streamline ESG research process</h3>`;

const planStart = `
<div class="step-active">
  <h3 class="highlight">Step 1 — Getting Started with HuggingFace</h3>
  <h4 class="highlight">Estimated Time: 21 mins</h4>

  <p>Your goals are as follows:</p>
  <ol>
      <li>Go to <u class="highlight">HuggingChat.co</u> to find the chat interface where you will use prompting to generate Python code.</li>
      <li>In a separate tab go to <u class="highlight">https://colab.research.google.com/</u> and select NEW NOTEBOOK. This will be where we run the Python code we’ve created </li>
      <li>Create the following prompt, and run it in HuggingChat:
      </br>
      <i>“Create a Python script for downloading the wikipedia page for the organization {ORGANIZATION NAME HERE} as a pdf.”</i>
      </li>
      <li>Copy the Python code from HuggingChat and paste it into the Google Collab Notebook</li>
      <li>Run your code by pressing the “play” button in the left-hand corner of your notebook. If it succeeds you will see a downloaded pdf of your organization’s wikipedia page. </li>
  </ol>

  <p>
  When you are ready, <i>upload a pdf evincing your completion of these goals!</i>
  In the next step, we will see how we can extend this flow to synthesize ESG data from across the web. 
  </p>

  <h4>Recommended Resources:</h4>
  <ul>
    <li ><u class="highlight">Youtube: Prompt-based Engineering for non-coders</u> </span> (Total Length: 27 mins,  Recommended: 1:30 - 5:37) </li>
    <li ><u class="highlight">Interactive Practice - Prompt-based Coding by FreeCodeCamp</u> </span> (Total Length: 7 mins) </li>
  </ul>
</div>
<div class="step-inactive">
  <div class="step-body">
    <h3 >Step 2 — Identifying Data Resources</h3>
    <h4 >Estimated Time: 18 mins</h4>
  </div>
  <div class="open-icon">
    <i class="fa-solid fa-arrow-up-right-from-square"></i>
  </div>
</div>
<div class="step-inactive">
  <div class="step-body">
    <h3 >Step 3 — Creating a Python Script for Data Mining</h3>
    <h4 >Estimated Time: 24 mins</h4>
  </div>
  <div class="open-icon">
    <i class="fa-solid fa-arrow-up-right-from-square"></i>
  </div>
</div>
<div class="step-inactive">
  <div class="step-body">
    <h3 >Step 4 — Running your Data Mining Script </h3>
    <h4 >Estimated Time: 9 mins</h4>
  </div>
  <div class="open-icon">
    <i class="fa-solid fa-arrow-up-right-from-square"></i>
  </div>
</div>
<div class="step-inactive">
  <div class="step-body">
    <h3 >Step 5 — Identifying Opportunities for Improvement </h3>
    <h4>Estimated Time: 11 mins</h4>
  </div>
  <div class="open-icon">
    <i class="fa-solid fa-arrow-up-right-from-square"></i>
  </div>
</div>
`;

module.exports = {usecase, upskillingPlan, planStart}