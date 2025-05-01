function OverviewPromptTemplate(
  projectName: string = '',
  goalAndBackground: string = '',
  keyFeatures: string = '',
  targetUsers: string = '',
  additionalPrompt: string = '',
  relatedInfo: string = ''
) {
  const promptParts: string[] = [];

  promptParts.push(
    `아래 내용을 기반으로 프로젝트 개요 문서를 작성해줘.
		다음 항목을 포함해줘:

		1. 프로젝트 이름
		2. 목표 (이 프로젝트를 왜 만들었는지)
		3. 주요 기능 (기능 항목별 설명 포함)
		4. 주요 대상 사용자
		5. 기술 스택 (프론트엔드/백엔드 구분)
		6. 향후 계획 (확장 가능성이나 업데이트 계획)

		내용은 간결하고 명확하게 써주고, 문서 형식으로 바로 복사해서 사용할 수 있도록 해줘.
		관련 내용이 없다면 필요한 내용을 적절하게 작성해.

		--- 아래는 참고할 정보야 ---`
  );

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

  return promptParts.join(' ');
}

export default OverviewPromptTemplate;
