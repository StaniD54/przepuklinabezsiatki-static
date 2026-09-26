/**
 * OptimizePress3 live editor extension:
 * put global element in edit mode.
 *
 * Dependencies:
 *     - jQuery.js
 *     - op3-core.js
 *     - op3-live-editor.js
 *     - op3-designer.js
 *     - op3-query.js
 *     - op3-global-elements.js
 */
;(function($, window, document) {

    "use strict";

    /**
     * Is edit mode
     *
     * @return {Boolean}
     */
    var isEditMode = function() {
        return OP3.Meta.postType === "op_global_element";
    }

    // element edit mode (append)
    OP3.bind("workerready", function() {
        if (!isEditMode())
            return;

        // there should be template for our global
        // element, we can not call it async
        var gid = OP3.Meta.pageId,
            data = OP3.GlobalElements.data(gid),
            error = null;

        // display errors inside worker
        if (!data)
            error = "element with gid " + gid + " does not exist";
        else if (!data.data)
            error = "no data loaded for element with gid " + gid;
        else
            data = data.data;
        if (error) {
            OP3.Worker.append(function() {
                throw "OP3.GlobalElements: " + error + ".";
            });

            return;
        }

        // clear document
        OP3.Worker.append(function() {
            this.data.op3 = this.data.op3 || {};
            this.data.op3.message = OP3._("Creating global element");

            // there is no need to execute this, but
            // for easier developing (debugging purpose)
            // here it is...
            OP3.Document.empty();

            // OP3.Map binds events on ready, so the
            // object won't be automatically cleared.
            for (var uuid in OP3.Map._data) {
                if (uuid !== "null")
                    delete OP3.Map._data[uuid];
            }
        });

        // create element jobs
        var prepare = OP3.$.unserializeAsyncPrepareJobs(data);
        for (var i = 0; i < prepare.jobs.length; i++) {
            var job = prepare.jobs[i],
                fn = job[0],
                args = job[1] || [];

            OP3.Worker.append(fn, args);
        }

        // append element to document
        OP3.Worker.append(function() {
            // update OP3.Map data
            // (OP3.Map would handle this itself, but it
            // would take too long, and since we already
            // have data prepared...)
            for (var uuid in prepare.flat) {
                OP3.Map._data[uuid] = prepare.flat[uuid];
            }

            // do the actual drop
            OP3.$(prepare.element).appendTo(OP3.Document);
        });
    });

    // element edit mode (focus and enter edit mode)
    OP3.bind("ready", function() {
        if (!isEditMode())
            return;

        // there should ne only one global element
        // on page, lets focus it and put it in
        // edit mode
        var gid = OP3.Meta.pageId,
            element = OP3.$('*[gid="' + gid + '"]');
        element.focus();
        OP3.GlobalElements.editMode(true);
        element.unfocus();
    });

    // do some live-editor tweaks
    OP3.bind("ready", function() {
        if (!isEditMode())
            return;

        // do not save page after global element save
        OP3.GlobalElements.AUTOSAVE = false;

        // override global element cancel:
        // no need to fix other global elements on
        // page (since there is only one element)
        OP3.GlobalElements.editCancel = function() {
            OP3.LiveEditor.close();
        };

        // override global element save:
        // close live editor callback
        //OP3.GlobalElements.editSave = function() {
        //    OP3.GlobalElements.editor().save(OP3.LiveEditor.close);
        //};

        // override global element save:
        // open wizard
        OP3.GlobalElements.editSave = function() {
            OP3.GlobalElements.openWizard();
        };

        // close live editor on completed
        // wizard close
        OP3.GlobalElements.wizard().bind("hide", function(e, o) {
            if (this.step() !== this._steps.length)
                return;

            OP3.LiveEditor.close();
        });

        // clear history on save
        if (OP3.History)
            OP3.bind("elementgidupdate", function(e, o) {
                OP3.History.clear();
            });

        // refresh wordpress list
        OP3.bind("elementgidupdate", function(e, o) {
            var element = OP3.$(o.node),
                gid = element.gid(),
                data = OP3.GlobalElements.data(gid),
                $list = $(top.document).find('.opb-global-elements-list .opb-global-element-list-item[data-gid="' + gid + '"]');
            $list
                .find(".opb-global-element-title")
                .text(data.title);
            $list
                .find(".opb-global-element-thumb")
                .attr("src", data.thumb)
                .attr("alt", data.title);
        });

        // override page save:
        // save global element
        OP3.LiveEditor.save = function() {
            OP3.GlobalElements.editSave();
        };
    });

})(jQuery, window, document);
