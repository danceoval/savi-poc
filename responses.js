const usecaseObj = {
  text : [
  "Okay, all of the data you state above are accessible via the Internet, so we will create a Python script to mine data from the relevant sources. You will then use NLP to summarize the consolidated data.", 
  "Worry not, you do not actually have to code anything! We will use Huggingface to generate a Python script. We will then leverage a pre-trained model for text and numerical data summarization from the Hugging Face Transformers library to generate a much higher-quality summary than what you would have gotten from an unspecialized AI model. Does that sound good to you?" 

  ],
  time : 'All of the above will take approximately 33 min in total. '
}

const dataSourcesObj = {
  header : "I can help you with that. Could you state relevant data sources? Here are some common data sources:",
  sources : [
    "US Census Bureau",
    "Web scraping",
    "Bureau of Labor Statistics",
    "Data.gov",
    "Nielsen"
  ]
}

const planObj = {
  header: "Project: HuggingFace to streamline ESG research process",
  steps: [
    {
      title: "Step 1: Getting Started with HuggingFace",
      length: "Estimated Time: 4 mins",
      goals: [
        "Go to HuggingChat.co to find the chat interface where you will use prompting to generate Python code.",
        "In a separate tab, go to https://colab.research.google.com/ and select NEW NOTEBOOK. This will be where we run the Python code we’ve created.",
        "Create the following prompt, and run it in HuggingChat:\n“Create a Python script for downloading the Wikipedia page for the organization {ORGANIZATION NAME HERE} as a PDF.”",
        "Copy the Python code from HuggingChat and paste it into the Google Colab Notebook",
        "Run your code by pressing the 'play' button in the left-hand corner of your notebook. If it succeeds, you will see a downloaded PDF of your organization’s Wikipedia page."
      ],
      submission: "When you are ready, upload a PDF evincing your completion of these goals! In the next step, we will see how we can extend this flow to synthesize ESG data from across the web.",
    },
    {
      title: "Step 2: Write a data mining script",
      length: "Estimated Time: 8 mins",
      goals : null,
      submission: null,
      resources : null
    },
    {
      title: "Step 3: Write a data mining script for your specific use case",
      length: "Estimated Time: 7 mins",
      goals : null,
      submission: null,
      resources : null
    },
    {
      title: "Step 4: Consolidate data with your script",
      length: "Estimated Time: 5 mins",
      goals : null,
      submission: null,
      resources : null
    },
    {
      title: "Step 5:  Use a pre-trained model in Huggingface to summarize your data",
      length: "Estimated Time: 9 mins",
      goals : null,
      submission: null,
      resources : null
    },
  ]
}


module.exports = { usecaseObj, planObj, dataSourcesObj}