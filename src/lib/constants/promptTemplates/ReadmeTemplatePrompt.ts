const ReadmeTemplatePrompt = (
  projectName: string = '',
  installation: string = '',
  usage: string = '',
  contribution: string = '',
  additionalPrompt: string = '',
  relatedInfo: string = ''
) => {
  const promptParts: string[] = [];

  promptParts.push(
    `아래 내용을 기반으로 README.md를 작성해줘.
			목차와 마크다운 포맷을 포함하고, 실제 GitHub에서 바로 활용할 수 있는 형식으로 작성해줘.
			각 항목은 짧고 핵심적으로 정리해줘.

			README 항목:
			1. 프로젝트 이름 및 설명
			2. 주요 기능 (리스트)
			3. 데모 또는 스크린샷 링크 (예시로 비워도 됨)
			4. 기술 스택
			5. 설치 및 실행 방법
			6. 환경 변수 설정 방법
			7. 주요 폴더 구조
			8. API 문서 링크 (있다면)
			9. 기여 방법
			10. 라이선스 (MIT 기본)

			--- 아래는 참고할 정보야 ---`
  );

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
  return promptParts.join(' ');
};

export default ReadmeTemplatePrompt;
