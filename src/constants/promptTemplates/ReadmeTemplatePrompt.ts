const ReadmeTemplatePrompt = (
  projectName: string = '',
  installation: string = '',
  usage: string = '',
  contribution: string = '',
  additionalPrompt: string = '',
  relatedInfo: string = ''
) => {
  const promptParts: string[] = [];

  if (projectName.trim()) {
    promptParts.push(`프로젝트 이름: ${projectName}`);
  }
  if (installation.trim()) {
    promptParts.push(`설치 방법: ${installation}`);
  }
  if (usage.trim()) {
    promptParts.push(`사용 방법: ${usage}`);
  }
  if (contribution.trim()) {
    promptParts.push(`기여 방법: ${contribution}`);
  }
  if (additionalPrompt.trim()) {
    promptParts.push(`추가 프롬프트: ${additionalPrompt}`);
  }
  if (relatedInfo.trim()) {
    promptParts.push(`다음은 관련 정보입니다. ${relatedInfo}`);
  }
  promptParts.push('이 정보를 바탕으로 README 문서를 작성해 주세요.');
  return promptParts.join(' ');
};

export default ReadmeTemplatePrompt;
