import {useRouter} from "next/router";
import {useCallback} from "react";
import {Model, StylesManager} from 'survey-core';
import {Survey} from "survey-react-ui";

import 'survey-core/defaultV2.min.css';

import json from './survey.json'

StylesManager.applyTheme("defaultV2");

const surveyJson = json

function SurveyResume() {
  const router = useRouter()
  const survey = new Model(surveyJson);

  const alertResults = useCallback((sender: { data: any }) => {
    const results = JSON.stringify(sender.data);
    alert(results)
    router.push('/resume/1')
  }, []);
  survey.onComplete.add(alertResults);
  return <Survey model={survey} />;
}

export default SurveyResume;
