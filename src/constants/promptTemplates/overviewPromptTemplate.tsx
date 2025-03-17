function OverviewPromptTemplate(
  projectName: string,
  goalAndBackground: string,
  keyFeatures: string,
  targetUsers: string,
  additionalPrompt: string,
  relatedInfo: string
) {
  let prompt = '';
  if (projectName) {
    prompt += `프로젝트 이름은 ${projectName}입니다.`;
  }
  if (goalAndBackground) {
    prompt += `이 프로젝트의 목표는 ${goalAndBackground}입니다.`;
  }
  if (keyFeatures) {
    prompt += `주요 기능으로는 ${keyFeatures}이 있습니다.`;
  }
  if (targetUsers) {
    prompt += `타겟 사용자는 ${targetUsers}입니다.`;
  }
  if (additionalPrompt) {
    prompt += `추가 프롬프트는 ${additionalPrompt}입니다.`;
  }
  if (relatedInfo) {
    prompt += `다음은 관련 정보입니다. ${relatedInfo} `;
  }

  return prompt;
}

export default OverviewPromptTemplate;
