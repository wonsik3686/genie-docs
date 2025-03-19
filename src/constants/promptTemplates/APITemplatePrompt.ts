const APITemplatePrompt = (
  apiName: string,
  requestFormat: string,
  responseFormat: string,
  examples: string,
  additionalPrompt: string,
  relatedInfo: string
) => {
  let prompt = '';
  if (apiName) {
    prompt += `API 이름: ${apiName}`;
  }
  if (requestFormat) {
    prompt += `요청 형식: ${requestFormat}`;
  }
  if (responseFormat) {
    prompt += `응답 형식: ${responseFormat}`;
  }
  if (examples) {
    prompt += `예제: ${examples}`;
  }
  if (additionalPrompt) {
    prompt += `추가 프롬프트: ${additionalPrompt}`;
  }
  if (relatedInfo) {
    prompt += `다음은 관련 정보입니다. ${relatedInfo} `;
  }
  prompt += '이 정보를 바탕으로 API	문서를 작성해 주세요.';
  return prompt;
};

export default APITemplatePrompt;
