import axios from "axios";
import {useRouter} from "next/router";
import {useCallback} from "react";
import {Model, StylesManager} from 'survey-core';
import {Survey} from "survey-react-ui";

import json from './survey.json'

StylesManager.applyTheme("defaultV2")

const surveyJson = json

function SurveyResume() {
  const router = useRouter()
  const survey = new Model(surveyJson);

  const alertResults = useCallback((sender: { data: any }) => {
    axios.post('/api/resume', sender.data).then(response => {
      router.push(`/resume/${response.data.id}`)
    })
  }, [])
  survey.onComplete.add(alertResults)

  return <Survey model={survey} />
}

export default SurveyResume;
