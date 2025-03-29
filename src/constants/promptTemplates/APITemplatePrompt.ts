const APITemplatePrompt = (
  apiName: string = '',
  requestFormat: string = '',
  responseFormat: string = '',
  examples: string = '',
  additionalPrompt: string = '',
  relatedInfo: string = ''
) => {
  const promptParts: string[] = [];

  promptParts.push(
    `아래 내용을 기반으로 API 문서를 작성해줘.
		문서는 마크다운 형식으로 작성하고, 다음 항목을 포함해줘:

		1. API 명 (기능 설명과 함께 제목 형태로)
		2. Endpoint
		3. Method
		4. Request Headers
		5. Request Body (예시 포함)
		6. Response Body (성공 및 에러 예시 포함)
		7. 상태 코드 설명 (200, 400, 401, 500 등)
		8. 사용 예제 (curl 또는 fetch 예제 중 1개)

		※ 요청/응답 예시는 JSON 형식으로 제공해줘.
		※ 오류 상황도 함께 다뤄줘.
		※ 가독성이 좋게 작성해줘.
		내용은 간결하고 명확하게 써주고, 문서 형식으로 바로 복사해서 사용할 수 있도록 해줘.
		관련 내용이 없다면 필요한 내용을 적절하게 작성해.

		--- 아래는 참고할 정보야 ---`
  );
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
