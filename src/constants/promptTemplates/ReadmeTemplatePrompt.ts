const ReadmeTemplatePrompt = (
  projectName: string,
  installation: string,
  usage: string,
  contribution: string,
  additionalPrompt: string,
  relatedInfo: string
) => {
  let prompt = '';
  if (projectName) {
    prompt += `프로젝트 이름: ${projectName}`;
  }
  if (installation) {
    prompt += `설치 방법: ${installation}`;
  }
  if (usage) {
    prompt += `사용 방법: ${usage}`;
  }
  if (contribution) {
    prompt += `기여 방법: ${contribution}`;
  }
  if (additionalPrompt) {
    prompt += `추가 프롬프트: ${additionalPrompt}`;
  }
  if (relatedInfo) {
    prompt += `다음은 관련 정보입니다. ${relatedInfo} `;
  }
  prompt += '이 정보를 바탕으로 README 문서를 작성해 주세요.';
  return prompt;
};

export default ReadmeTemplatePrompt;
