// Код для автозаполнения UTM-меток в формах Битрикс24
function getUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const referrer = document.referrer;
    
    return {
        utm_source: urlParams.get('utm_source') || '',
        utm_medium: urlParams.get('utm_medium') || '',
        utm_campaign: urlParams.get('utm_campaign') || '',
        utm_content: urlParams.get('utm_content') || '',
        utm_term: urlParams.get('utm_term') || '',
        gclid: urlParams.get('gclid') || '',
        yclid: urlParams.get('yclid') || '',
        referrer: referrer,
        landing_url: window.location.hostname
    };
}

function fillUtmFields() {
    const params = getUrlParams();
    
    // Заполняем скрытые поля в форме
    Object.keys(params).forEach(key => {
        const field = document.querySelector(`input[name="${key}"]`);
        if (field && params[key]) {
            field.value = params[key];
        }
    });
    
    // Автоопределение source/medium по referrer если UTM нет
    if (!params.utm_source && params.referrer) {
        const referrerDomain = new URL(params.referrer).hostname;
        
        if (referrerDomain.includes('google.com')) {
            document.querySelector('input[name="utm_source"]').value = 'google_organic';
            document.querySelector('input[name="utm_medium"]').value = 'organic';
        } else if (referrerDomain.includes('yandex.ru')) {
            document.querySelector('input[name="utm_source"]').value = 'yandex_organic';
            document.querySelector('input[name="utm_medium"]').value = 'organic';
        } else if (referrerDomain.includes('napopravku.ru')) {
            document.querySelector('input[name="utm_source"]').value = 'napopravku';
            document.querySelector('input[name="utm_medium"]').value = 'referral';
        }
    }
}

// Запускаем при загрузке страницы
document.addEventListener('DOMContentLoaded', fillUtmFields);
