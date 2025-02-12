// 1. querystring을 사용하여 음식 선호도를 쿼리 문자열로 변환하는 함수
function createFoodPreferenceQuery(student) {
  const querystring = require('querystring');
  const queryData = {
    name: student.name,
    order: student.order,
    likeFoods: student.food.like,
    hateFoods: student.food.hate
  };
  
  const queryString = querystring.stringify(queryData);
  return queryString;
}

// 2. 학생별 음식 선호도를 JSON으로 변환하는 함수
function convertToJSON(student) {
  const studentData = {
    studentInfo: {
      order: student.order,
      name: student.name
    },
    foodPreferences: {
      like: student.food.like,
      hate: student.food.hate
    }
  };
  
  const jsonString = JSON.stringify(studentData, null, 2);
  return jsonString;
}

// 3. 전체 학생들의 선호/비선호 음식 통계를 분석하는 함수
function analyzeFoodPreferences(students) {
  function countPreferences(foods) {
    // 배열의 모든 음식 항목을 하나의 객체로 reduce
    return foods.reduce((acc, food) => {
      // 기존 값이 있으면 +1, 없으면 1로 초기화
      const count = acc[food] || 0;
      return {
        ...acc,
        [food]: count + 1
      };
    }, {});
  }

  // 모든 학생의 선호 음식을 하나의 배열로 만듦
  const allLikedFoods = students.reduce((acc, student) => {
    return [...acc, ...student.food.like];
  }, []);

  // 모든 학생의 비선호 음식을 하나의 배열로 만듦
  const allHatedFoods = students.reduce((acc, student) => {
    return [...acc, ...student.food.hate];
  }, []);

  return {
    likes: countPreferences(allLikedFoods),
    hates: countPreferences(allHatedFoods)
  };
}

// 4. 메인 실행 코드
function main() {
  // 첫 번째 학생의 데이터를 쿼리스트링으로 변환
  const firstStudent = students[0];
  const queryString = createFoodPreferenceQuery(firstStudent);
  console.log('1. 첫 번째 학생의 쿼리스트링:');
  console.log(queryString);
  console.log('\n');

  // 첫 번째 학생의 데이터를 JSON으로 변환
  const jsonString = convertToJSON(firstStudent);
  console.log('2. 첫 번째 학생의 JSON 데이터:');
  console.log(jsonString);
  console.log('\n');

  // 전체 음식 선호도 통계 분석
  const foodStats = analyzeFoodPreferences(students);
  console.log('3. 전체 음식 선호도 통계:');
  console.log(JSON.stringify(foodStats, null, 2));
}

// 실행
main();