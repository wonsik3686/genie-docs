function OverviewPromptTemplate(
  projectName: string = '',
  goalAndBackground: string = '',
  keyFeatures: string = '',
  targetUsers: string = '',
  additionalPrompt: string = '',
  relatedInfo: string = ''
) {
  const promptParts: string[] = [];

  if (projectName.trim()) {
    promptParts.push(`프로젝트 이름은 ${projectName}입니다.`);
  }
  if (goalAndBackground.trim()) {
    promptParts.push(`이 프로젝트의 목표는 ${goalAndBackground}입니다.`);
  }
  if (keyFeatures.trim()) {
    promptParts.push(`주요 기능으로는 ${keyFeatures}이 있습니다.`);
  }
  if (targetUsers.trim()) {
    promptParts.push(`타겟 사용자는 ${targetUsers}입니다.`);
  }
  if (additionalPrompt.trim()) {
    promptParts.push(`추가 프롬프트는 ${additionalPrompt}입니다.`);
  }
  if (relatedInfo.trim()) {
    promptParts.push(`다음은 관련 정보입니다. ${relatedInfo}`);
  }
  promptParts.push('이 정보를 바탕으로 프로젝트 개요 문서를 작성해 주세요.');

  return promptParts.join(' ');
}

export default OverviewPromptTemplate;
