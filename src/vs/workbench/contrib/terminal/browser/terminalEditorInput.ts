/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { URI } from 'vs/base/common/uri';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { EditorInput } from 'vs/workbench/common/editor/editorInput';
import { ITerminalInstance, ITerminalService } from 'vs/workbench/contrib/terminal/browser/terminal';

export class TerminalEditorInput extends EditorInput {

	static readonly ID = 'workbench.editors.terminal';

	override get typeId(): string {
		return TerminalEditorInput.ID;
	}

	private readonly _terminalInstance: ITerminalInstance;

	get terminalInstance(): ITerminalInstance {
		return this._terminalInstance;
	}

	get resource(): URI {
		return this.terminalInstance.resource;
	}

	constructor(
		@ITerminalService terminalService: ITerminalService
	) {
		super();
		this._terminalInstance = terminalService.createTerminal();
	}

	static copy(instantiationService: IInstantiationService): TerminalEditorInput {
		return instantiationService.createInstance(TerminalEditorInput);
	}

	override getName() {
		return this.terminalInstance.title;
	}
}