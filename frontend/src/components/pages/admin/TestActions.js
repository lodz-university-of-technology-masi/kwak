import React, { cloneElement, useMemo } from 'react';
import { CreateButton, TopToolbar, sanitizeListRestProps, Button} from 'react-admin';
import { Link } from 'react-router-dom';
import { ImportExport } from '@material-ui/icons';

export const TestActions = ({
                         currentSort,
                         className,
                         resource,
                         filters,
                         displayedFilters,
                         exporter,
                         filterValues,
                         permanentFilter,
                         hasCreate,
                         basePath,
                         selectedIds,
                         onUnselectItems,
                         showFilter,
                         total,
                         ...rest
                     }) =>
    useMemo(
        () => (
            <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
                {filters &&
                cloneElement(filters, {
                    resource,
                    showFilter,
                    displayedFilters,
                    filterValues,
                    context: 'button',
                })}
                {hasCreate && <CreateButton basePath={basePath} />}
                <Button component={Link} to={`${basePath}/import`} label="Import">
                    {<ImportExport />}
                </Button>
            </TopToolbar>
        ),
        [resource, displayedFilters, filterValues, selectedIds, filters, total] // eslint-disable-line react-hooks/exhaustive-deps
    );

