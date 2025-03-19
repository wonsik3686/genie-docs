const APITemplatePrompt = (
  apiName: string = '',
  requestFormat: string = '',
  responseFormat: string = '',
  examples: string = '',
  additionalPrompt: string = '',
  relatedInfo: string = ''
) => {
  const promptParts: string[] = [];

  if (apiName.trim()) {
    promptParts.push(`API 이름: ${apiName}`);
  }
  if (requestFormat.trim()) {
    promptParts.push(`요청 형식: ${requestFormat}`);
  }
  if (responseFormat.trim()) {
    promptParts.push(`응답 형식: ${responseFormat}`);
  }
  if (examples.trim()) {
    promptParts.push(`예제: ${examples}`);
  }
  if (additionalPrompt.trim()) {
    promptParts.push(`추가 프롬프트: ${additionalPrompt}`);
  }
  if (relatedInfo.trim()) {
    promptParts.push(`다음은 관련 정보입니다. ${relatedInfo}`);
  }
  promptParts.push('이 정보를 바탕으로 API 문서를 작성해 주세요.');
  return promptParts.join(' ');
};

export default APITemplatePrompt;
