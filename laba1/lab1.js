console.log("Використання функції: triangle(value1, type1, value2, type2)");
console.log("Доступні типи параметрів:");
console.log("- Сторони трикутника: 'leg' (катет), 'hypotenuse' (гіпотенуза)");
console.log("- Кути трикутника: 'adjacent angle' (прилеглий кут до катета),");
console.log("  'opposite angle' (протилежний кут від катета), 'angle' (кут при гіпотенузі)");
console.log("Увага! Всі значення мають бути додатні та дійсні!");

function triangle(value1, type1, value2, type2) {
    let a, b, c, alpha, beta;
    
    if (value1 <= 0 || value2 <= 0) {
        console.error("Помилка: Значення мають бути більші за 0");
        return;
    }

    switch (`${type1}-${type2}`) {
        case "leg-leg":
            a = value1;
            b = value2;
            c = Math.sqrt(a * a + b * b);
            alpha = Math.asin(a / c) * (180 / Math.PI);
            beta = 90 - alpha;
            break;
        
        case "leg-hypotenuse":
        case "hypotenuse-leg":
            a = type1 === "leg" ? value1 : value2;
            c = type1 === "hypotenuse" ? value1 : value2;
            
            if (a >= c) {
                console.error("Помилка: Катет не може бути більшим або рівним за гіпотенузу.");
                return;
            }
            
            b = Math.sqrt(c * c - a * a);
            alpha = Math.asin(a / c) * (180 / Math.PI);
            beta = 90 - alpha;
            break;
        
        case "hypotenuse-angle":
        case "angle-hypotenuse":
            alpha = type1 === "angle" ? value1 : value2;
            c = type1 === "hypotenuse" ? value1 : value2;
            
            if (alpha <= 0 || alpha >= 90) {
                console.error("Помилка: Гострий кут має бути між 0 і 90 градусами.");
                return;
            }
            
            let rad = alpha * (Math.PI / 180);
            a = c * Math.sin(rad);
            b = c * Math.cos(rad);
            beta = 90 - alpha;
            break;
        
        case "leg-opposite angle":
        case "opposite angle-leg":
            a = type1 === "leg" ? value1 : value2;
            alpha = type1 === "opposite angle" ? value1 : value2;
            
            if (alpha <= 0 || alpha >= 90) {
                console.error("Помилка: Гострий кут має бути між 0 і 90 градусами.");
                return;
            }
            
            rad = alpha * (Math.PI / 180);
            c = a / Math.sin(rad);
            b = Math.sqrt(c * c - a * a);
            beta = 90 - alpha;
            break;
        
        case "leg-adjacent angle":
        case "adjacent angle-leg":
            b = type1 === "leg" ? value1 : value2;
            beta = type1 === "adjacent angle" ? value1 : value2;
            
            if (beta <= 0 || beta >= 90) {
                console.error("Помилка: Гострий кут має бути між 0 і 90 градусами.");
                return;
            }
            
            rad = beta * (Math.PI / 180);
            c = b / Math.cos(rad);
            a = Math.sqrt(c * c - b * b);
            alpha = 90 - beta;
            break;
        
        default:
            console.error("Помилка: Неправильні типи аргументів. Перевірте інструкцію.");
            return;
    }

    alpha = Number(alpha.toFixed(2));
    beta = Number(beta.toFixed(2));
    
    console.log(`Сторони трикутника: a = ${a}, b = ${b}, c = ${c}`);
    console.log(`Кути трикутника: alpha = ${alpha}, beta = ${beta}`);
}
