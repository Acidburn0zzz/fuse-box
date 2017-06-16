import * as path from "path";
import { jsCommentTemplate } from "../../Utils";
import { Config } from "../../Config";
import { QuantumCore } from "./QuantumCore";

export class ResponsiveAPI {
    private computedStatements = false;
    private hashes = false;
    private isServerFunction = false;
    private isBrowserFunction = false;
    private customMappings = {};
    private lazyLoading = false;
    private customStatementResolve = false;
    private bundleMapping: any;
    private ajaxRequired = false;
    private codeSplitting = false;
    private jsonLoader = false;
    private cssLoader = false;
    constructor(public core: QuantumCore) { }

    public addComputedRequireStatetements() {
        this.computedStatements = true;
        this.hashes = true;
    }

    public addLazyLoading() {
        this.lazyLoading = true;
        if (this.core.opts.isTargetUniveral()) {
            this.ajaxRequired = true;
        }
        if (this.core.opts.isTargetBrowser()) {
            this.ajaxRequired = true;
        }
    }

    public useCodeSplitting() {
        this.codeSplitting = true;
    }

    public addJSONLoader() {
        this.jsonLoader = true;
    }

    public addCSSLoader() {
        this.cssLoader = true;
    }

    public hashesUsed() {
        return this.hashes;
    }

    public addMapping(fuseBoxPath: string, id: any) {
        this.customMappings[fuseBoxPath] = id;
        this.customStatementResolve = true;
    }

    public setBundleMapping(data: any) {
        this.bundleMapping = data;
    }

    public addIsServerFunction() {
        this.isServerFunction = true;
    }

    public addIsBrowserFunction() {
        this.isBrowserFunction = true;
    }

    public render() {
        const options = {
            browser: this.core.opts.isTargetBrowser(),
            universal: this.core.opts.isTargetUniveral(),
            server: this.core.opts.isTargetServer(),
            isServerFunction: this.isServerFunction,
            isBrowserFunction: this.isBrowserFunction,
            computedStatements: this.computedStatements,
            hashes: this.hashes,
            customStatementResolve: this.customStatementResolve,
            lazyLoading: this.lazyLoading,
            codeSplitting: this.codeSplitting,
            ajaxRequired: this.ajaxRequired,
            jsonLoader: this.jsonLoader,
            cssLoader: this.cssLoader
        }
        const variables: any = {};
        if (Object.keys(this.customMappings).length > 0) {
            variables.customMappings = this.customMappings;
        }
        if (this.bundleMapping) {
            variables.bundleMapping = this.bundleMapping;
        }
        return jsCommentTemplate(path.join(Config.FUSEBOX_MODULES, "fuse-box-responsive-api/index.js"), options, variables);
    }
}
