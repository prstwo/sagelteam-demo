import * as ProjectConfig from 'Models/utils/project-config';

export default function generateIcon (iconName, isSymbol = false, className = '') {
	if (isSymbol) {
		return generateIconSvg(iconName, null, className);
	} else {
		return generateIconImage(iconName, null, className);
	}
}

export function generateIconSvg (iconName, path = null, className = '') {
	if (!path) path = `${ProjectConfig.get('assetsUrl')}icons/symbols`;

	return `<div class="icon ${className}"><svg><use href="${path}.svg#icon-${iconName}" /></svg></div>`;
}

export function generateIconObject (iconName, path = null, className = '') {
	if (!path) path = `${ProjectConfig.get('assetsUrl')}icons/inline`;

	return `<object class="icon icon-object ${className}" data="${path}/${iconName}.svg" type="image/svg+xml"></object>`;
}

export function generateIconImage (iconName, path = null, className = '') {
	if (!path) path = `${ProjectConfig.get('assetsUrl')}icons/inline`;

	return `<img class="icon-image ${className}" src="${path}/${iconName}.svg" alt="${iconName}" />`;
}
