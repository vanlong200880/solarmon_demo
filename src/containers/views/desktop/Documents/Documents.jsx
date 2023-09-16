import React from 'react';

export default function Documents() {
    var { t } = this.props;
    return (
        <div className="document">
            <div className="row">
                <div className="col-md-12">
                    <div className="page-breadcrumb">
                        <div className="row">
                            <div className="col-md-12"><h2>{t('account.documents')}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <iframe id="framePrintId" width="100%" title="Document" height="1150" name="framePrintId" frameBorder="0"   src= "/document.pdf"></iframe>

                </div>
            </div>
        </div>

    )
}